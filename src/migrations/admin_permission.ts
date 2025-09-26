import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	AdminPermissionMigration,
	AdminPermissionV2Array,
	AdminPermissionV3,
} from "../types/admin_permission.js";
import { PermissionMigration } from "../types/permission.js";
import { AdminMigration } from "../types/admin.js";
import { EventMigration } from "../types/event.js";

export const migrateAdminPermissions = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	permissions: PermissionMigration[],
	events: EventMigration[],
	admins: AdminMigration[]
) => {
	const adminPermissions = AdminPermissionV2Array.parse(fromDB);

	const adminPermissionsMigration: AdminPermissionMigration[] =
		adminPermissions.map(adminPermission => {
			const possiblePermission = permissions.find(
				permission =>
					permission.old.id === adminPermission.permission_id
			);

			if (possiblePermission === undefined) {
				console.error(
					`Nie znaleziono permisji o ID ${adminPermission.permission_id}`
				);
				process.exit(1);
			}

			const possibleAdmin = admins.find(
				admin => admin.old.id === adminPermission.admin_id
			);

			if (possibleAdmin === undefined) {
				console.error(
					`Nie znaleziono admina o ID ${adminPermission.admin_id}`
				);
				process.exit(1);
			}

			const possibleEvent = events.find(
				event => event.old.id === adminPermission.event_id
			);

			if (possibleEvent === undefined) {
				console.error(
					`Nie znaleziono eventu o ID ${adminPermission.event_id}`
				);
				process.exit(1);
			}

			const newAdminPermission: AdminPermissionV3 = {
				uuid: uuidv4(),
				adminUuid: possibleAdmin.new.uuid,
				eventUuid: possibleEvent.new.uuid,
				permissionUuid: possiblePermission.new.uuid,
				createdAt: adminPermission.created_at ?? new Date(),
				updatedAt:
					adminPermission.updated_at ??
					adminPermission.created_at ??
					new Date(),
			};

			return {
				old: adminPermission,
				new: newAdminPermission,
			};
		});

	for (const adminPermissionMigration of adminPermissionsMigration) {
		await sql_v3`INSERT INTO "AdminsPermissions" (uuid, "adminUuid", "eventUuid", "permissionUuid", "createdAt", "updatedAt") VALUES (
			${adminPermissionMigration.new.uuid},
			${adminPermissionMigration.new.adminUuid},
			${adminPermissionMigration.new.eventUuid},
			${adminPermissionMigration.new.permissionUuid},
			${adminPermissionMigration.new.createdAt},
			${adminPermissionMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated adminPermissions");

	return adminPermissionsMigration;
};

import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	PermissionV2Array,
	PermissionMigration,
	PermissionV3,
} from "../types/permission.js";

export const migratePermissions = async (
	fromDB: postgres.RowList<postgres.Row[]>
) => {
	const permissions = PermissionV2Array.parse(fromDB);

	const permissionsMigration: PermissionMigration[] = permissions.map(
		permission => {
			const newPermission: PermissionV3 = {
				uuid: uuidv4(),
				action: permission.action,
				subject: permission.subject,
			};

			return {
				old: permission,
				new: newPermission,
			};
		}
	);

	for (const permissionMigration of permissionsMigration) {
		await sql_v3`INSERT INTO "Permissions" (uuid, action, subject) VALUES (${permissionMigration.new.uuid}, ${permissionMigration.new.action}, ${permissionMigration.new.subject});`;
	}

	console.log("Migrated permissions");

	return permissionsMigration;
};

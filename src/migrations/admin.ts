import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import { AdminMigration, AdminV2Array, AdminV3 } from "../types/admin.js";

export const migrateAdmins = async (
	fromDB: postgres.RowList<postgres.Row[]>
) => {
	const admins = AdminV2Array.parse(fromDB);

	const adminsMigration: AdminMigration[] = admins.map(admin => {
		const newAdmin: AdminV3 = {
			uuid: uuidv4(),
			firstName: admin.first_name,
			lastName: admin.last_name,
			password: admin.password,
			email: admin.email,
			type: admin.type,
			active: admin.active,
			createdAt: admin.created_at,
			updatedAt: admin.updated_at ?? admin.created_at,
		};

		return {
			old: admin,
			new: newAdmin,
		};
	});

	for (const adminMigration of adminsMigration) {
		await sql_v3`INSERT INTO "Admins" (uuid, "firstName", "lastName", "password", "email", "type", "active", "createdAt", "updatedAt") VALUES (
			${adminMigration.new.uuid},
			${adminMigration.new.firstName},
			${adminMigration.new.lastName},
			${adminMigration.new.password},
			${adminMigration.new.email},
			${adminMigration.new.type},
			${adminMigration.new.active},
			${adminMigration.new.createdAt},
			${adminMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated admins");

	return adminsMigration;
};

import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	AuthAccessTokenMigration,
	AuthAccessTokenV2Array,
	AuthAccessTokenV3,
} from "../types/auth_access_token.js";
import { AdminMigration } from "../types/admin.js";

export const migrateAuthAccessTokens = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	admins: AdminMigration[]
) => {
	const authAccessTokens = AuthAccessTokenV2Array.parse(fromDB);

	const authAccessTokensMigration: AuthAccessTokenMigration[] =
		authAccessTokens.map(authAccessToken => {
			const possibleAdmin = admins.find(
				admin => admin.old.id === authAccessToken.tokenable_id
			);

			if (possibleAdmin === undefined) {
				console.error(
					`Nie znaleziono admina o ID ${authAccessToken.tokenable_id}`
				);
				process.exit(1);
			}

			const newAuthAccessToken: AuthAccessTokenV3 = {
				uuid: uuidv4(),
				tokenableUuid: possibleAdmin.new.uuid,
				abilities: authAccessToken.abilities,
				hash: authAccessToken.hash,
				name: authAccessToken.name,
				type: authAccessToken.type,
				lastUsedAt: authAccessToken.last_used_at,
				expiresAt: authAccessToken.expires_at,
				createdAt: authAccessToken.created_at,
				updatedAt:
					authAccessToken.updated_at ?? authAccessToken.created_at,
			};

			return {
				old: authAccessToken,
				new: newAuthAccessToken,
			};
		});

	for (const authAccessTokenMigration of authAccessTokensMigration) {
		await sql_v3`INSERT INTO "AuthAccessTokens" (uuid, "tokenableUuid", abilities, hash, name, type, "lastUsedAt", "expiresAt", "createdAt", "updatedAt") VALUES (
			${authAccessTokenMigration.new.uuid},
			${authAccessTokenMigration.new.tokenableUuid},
			${authAccessTokenMigration.new.abilities},
			${authAccessTokenMigration.new.hash},
			${authAccessTokenMigration.new.name},
			${authAccessTokenMigration.new.type},
			${authAccessTokenMigration.new.lastUsedAt},
			${authAccessTokenMigration.new.expiresAt},
			${authAccessTokenMigration.new.createdAt},
			${authAccessTokenMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated authAccessTokens");

	return authAccessTokensMigration;
};

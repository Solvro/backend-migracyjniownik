import z from "zod";

export const AuthAccessTokenV2 = z.object({
	id: z.number(),
	tokenable_id: z.string(),
	type: z.string(),
	name: z.string().nullable(),
	hash: z.string(),
	abilities: z.string(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	last_used_at: z.date().nullable(),
	expires_at: z.date().nullable(),
});

export const AuthAccessTokenV2Array = z.array(AuthAccessTokenV2);

export type AuthAccessTokenV2 = z.infer<typeof AuthAccessTokenV2>;
export type AuthAccessTokenV2array = z.infer<typeof AuthAccessTokenV2Array>;

export const AuthAccessTokenV3 = z.object({
	uuid: z.uuidv4(),
	tokenableUuid: z.uuidv4(),
	type: z.string(),
	name: z.string().nullable(),
	hash: z.string(),
	abilities: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	lastUsedAt: z.date(),
	expiresAt: z.date(),
});

export const AuthAccessTokenV3Array = z.array(AuthAccessTokenV3);

export type AuthAccessTokenV3 = z.infer<typeof AuthAccessTokenV3>;
export type AuthAccessTokenV3Array = z.infer<typeof AuthAccessTokenV3Array>;

export interface AuthAccessTokenMigration {
	old: AuthAccessTokenV2;
	new: AuthAccessTokenV3;
}

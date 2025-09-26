import z from "zod";

export const PermissionV2 = z.object({
	id: z.number(),
	action: z.string(),
	subject: z.string(),
});

export const PermissionV2Array = z.array(PermissionV2);

export type PermissionV2 = z.infer<typeof PermissionV2>;
export type PermissionV2Array = z.infer<typeof PermissionV2Array>;

export const PermissionV3 = z.object({
	uuid: z.uuidv4(),
	action: z.string(),
	subject: z.string(),
});

export const PermissionV3Array = z.array(PermissionV3);

export type PermissionV3 = z.infer<typeof PermissionV3>;
export type PermissionV3Array = z.infer<typeof PermissionV3Array>;

export interface PermissionMigration {
	old: PermissionV2;
	new: PermissionV3;
}

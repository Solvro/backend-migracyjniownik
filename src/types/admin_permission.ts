import z from "zod";

export const AdminPermissionV2 = z.object({
	id: z.number(),
	event_id: z.number(),
	permission_id: z.number(),
	admin_id: z.number(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const AdminPermissionV2Array = z.array(AdminPermissionV2);

export type AdminPermissionV2 = z.infer<typeof AdminPermissionV2>;
export type AdminPermissionV2array = z.infer<typeof AdminPermissionV2Array>;

export const AdminPermissionV3 = z.object({
	uuid: z.uuidv4(),
	eventUuid: z.uuidv4(),
	permissionUuid: z.uuidv4(),
	adminUuid: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const AdminPermissionV3Array = z.array(AdminPermissionV3);

export type AdminPermissionV3 = z.infer<typeof AdminPermissionV3>;
export type AdminPermissionV3Array = z.infer<typeof AdminPermissionV3Array>;

export interface AdminPermissionMigration {
	old: AdminPermissionV2;
	new: AdminPermissionV3;
}

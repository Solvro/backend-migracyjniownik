import z from "zod";

export const AdminV2 = z.object({
	id: z.number(),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	email: z.email(),
	type: z.enum(["organizer", "superadmin"]),
	active: z.boolean(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const AdminV2Array = z.array(AdminV2);

export type AdminV2 = z.infer<typeof AdminV2>;
export type AdminV2array = z.infer<typeof AdminV2Array>;

export const AdminV3 = z.object({
	uuid: z.uuidv4(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string(),
	email: z.email(),
	type: z.enum(["organizer", "superadmin"]),
	active: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const AdminV3Array = z.array(AdminV3);

export type AdminV3 = z.infer<typeof AdminV3>;
export type AdminV3Array = z.infer<typeof AdminV3Array>;

export interface AdminMigration {
	old: AdminV2;
	new: AdminV3;
}

import z from "zod";

export const FormV2 = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	start_date: z.date().nullable(),
	is_open: z.boolean(),
	is_first_form: z.boolean(),
	description: z.string().nullable(),
	end_date: z.date().nullable(),
	event_id: z.number(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const FormV2Array = z.array(FormV2);

export type FormV2 = z.infer<typeof FormV2>;
export type FormV2Array = z.infer<typeof FormV2Array>;

export const FormV3 = z.object({
	uuid: z.uuidv4(),
	name: z.string(),
	isEditable: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
	openDate: z.date().nullable(),
	closeDate: z.date().nullable(),
	description: z.string().nullable(),
	eventUuid: z.uuidv4(),
});

export const FormV3Array = z.array(FormV3);

export type FormV3 = z.infer<typeof FormV3>;
export type FormV3Array = z.infer<typeof FormV3Array>;

export interface FormMigration {
	old: FormV2;
	new: FormV3;
}

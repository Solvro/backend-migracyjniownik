import z from "zod";

export const FormDefinitionV2 = z.object({
	id: z.number(),
	attribute_id: z.number().nullable(),
	form_id: z.number().nullable(),
	is_editable: z.boolean(),
	is_required: z.boolean(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	order: z.number().nullable(),
});

export const FormDefinitionV2Array = z.array(FormDefinitionV2);

export type FormDefinitionV2 = z.infer<typeof FormDefinitionV2>;
export type FormDefinitionV2array = z.infer<typeof FormDefinitionV2Array>;

export const FormDefinitionV3 = z.object({
	uuid: z.uuidv4(),
	isRequired: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
	order: z.number().nullable(),
	attributeUuid: z.uuidv4().nullable(),
	formUuid: z.uuidv4().nullable(),
});

export const FormDefinitionV3Array = z.array(FormDefinitionV3);

export type FormDefinitionV3 = z.infer<typeof FormDefinitionV3>;
export type FormDefinitionV3Array = z.infer<typeof FormDefinitionV3Array>;

export interface FormDefinitionMigration {
	old: FormDefinitionV2;
	new: FormDefinitionV3;
}

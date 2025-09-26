import z from "zod";

export const AttributeV2 = z.object({
	id: z.number(),
	name: z.string().nullable(),
	slug: z.string().nullable(),
	event_id: z.number(),
	show_in_list: z.boolean(),
	options: z.array(z.string()).nullable(),
	type: z.enum([
		"text",
		"textarea",
		"number",
		"file",
		"select",
		"block",
		"date",
		"time",
		"datetime",
		"multiselect",
		"email",
		"tel",
		"color",
		"checkbox",
	]),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	order: z.number(),
});

export const AttributeV2Array = z.array(AttributeV2);

export type AttributeV2 = z.infer<typeof AttributeV2>;
export type AttributeV2Array = z.infer<typeof AttributeV2Array>;

export const AttributeV3 = z.object({
	uuid: z.uuidv4(),
	eventUuid: z.uuidv4(),
	type: z.enum([
		"text",
		"textArea",
		"number",
		"file",
		"select",
		"block",
		"date",
		"time",
		"datetime",
		"multiSelect",
		"email",
		"tel",
		"color",
		"checkbox",
	]),
	createdAt: z.date(),
	updatedAt: z.date(),
	showInList: z.boolean(),
	order: z.number(),
	options: z.array(z.string()).nullable(),
	name: z.string().nullable(),
});

export const AttributeV3Array = z.array(AttributeV3);

export type AttributeV3 = z.infer<typeof AttributeV3>;
export type AttributeV3Array = z.infer<typeof AttributeV3Array>;

export interface AttributeMigration {
	old: AttributeV2;
	new: AttributeV3;
}

import z from "zod";

export const EmailV2 = z.object({
	id: z.number(),
	event_id: z.number().nullable(),
	name: z.string(),
	content: z.string(),
	trigger: z.enum([
		"participant_registered",
		"participant_deleted",
		"form_filled",
		"attribute_changed",
		"manual",
	]),
	trigger_value: z.string().nullable(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	trigger_value_2: z.string().nullable(),
	form_id: z.number().nullable(),
});

export const EmailV2Array = z.array(EmailV2);

export type EmailV2 = z.infer<typeof EmailV2>;
export type EmailV2Array = z.infer<typeof EmailV2Array>;

export const EmailV3 = z.object({
	uuid: z.uuidv4(),
	name: z.string(),
	content: z.string(),
	trigger: z.enum([
		"PARTICIPANT_REGISTERED",
		"PARTICIPANT_DELETED",
		"FORM_FILLED",
		"ATTRIBUTE_CHANGED",
		"MANUAL",
	]),
	createdAt: z.date(),
	updatedAt: z.date(),
	triggerValue: z.string().nullable(),
	triggerValue2: z.string().nullable(),
	eventUuid: z.uuidv4().nullable(),
	formUuid: z.uuidv4().nullable(),
});

export const EmailV3Array = z.array(EmailV3);

export type EmailV3 = z.infer<typeof EmailV3>;
export type EmailV3Array = z.infer<typeof EmailV3Array>;

export interface EmailMigration {
	old: EmailV2;
	new: EmailV3;
}

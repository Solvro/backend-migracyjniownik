import z from "zod";

export const ParticipantAttributeV2 = z.object({
	id: z.number(),
	participant_id: z.number(),
	attribute_id: z.number(),
	value: z.string().nullable(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const ParticipantAttributeV2Array = z.array(ParticipantAttributeV2);

export type ParticipantAttributeV2 = z.infer<typeof ParticipantAttributeV2>;
export type ParticipantAttributeV2Array = z.infer<
	typeof ParticipantAttributeV2Array
>;

export const ParticipantAttributeV3 = z.object({
	uuid: z.uuidv4(),
	participantUuid: z.uuidv4(),
	attributeUuid: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
	value: z.string().nullable(),
});

export const ParticipantAttributeV3Array = z.array(ParticipantAttributeV3);

export type ParticipantAttributeV3 = z.infer<typeof ParticipantAttributeV3>;
export type ParticipantAttributeV3Array = z.infer<
	typeof ParticipantAttributeV3Array
>;

export interface ParticipantAttributeMigration {
	old: ParticipantAttributeV2;
	new: ParticipantAttributeV3;
}

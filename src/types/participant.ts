import z from "zod";

export const ParticipantV2 = z.object({
	id: z.number(),
	email: z.email(),
	event_id: z.number(),
	slug: z.string(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const ParticipantV2Array = z.array(ParticipantV2);

export type ParticipantV2 = z.infer<typeof ParticipantV2>;
export type ParticipantV2array = z.infer<typeof ParticipantV2Array>;

export const ParticipantV3 = z.object({
	uuid: z.uuidv4(),
	email: z.email(),
	eventUuid: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const ParticipantV3Array = z.array(ParticipantV3);

export type ParticipantV3 = z.infer<typeof ParticipantV3>;
export type ParticipantV3Array = z.infer<typeof ParticipantV3Array>;

export interface ParticipantMigration {
	old: ParticipantV2;
	new: ParticipantV3;
}

import z from "zod";

export const ParticipantEmailV2 = z.object({
	id: z.number(),
	participant_id: z.number().nullable(),
	email_id: z.number().nullable(),
	send_at: z.date(),
	send_by: z.string().nullable(),
	status: z.enum(["pending", "sent", "failed"]),
	created_at: z.date(),
	updated_at: z.date().nullable(),
});

export const ParticipantEmailV2Array = z.array(ParticipantEmailV2);

export type ParticipantEmailV2 = z.infer<typeof ParticipantEmailV2>;
export type ParticipantEmailV2Array = z.infer<typeof ParticipantEmailV2Array>;

export const ParticipantEmailV3 = z.object({
	uuid: z.uuidv4(),
	status: z.enum(["pending", "sent", "failed"]),
	sendAt: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
	sendBy: z.string().nullable(),
	participantUuid: z.uuidv4().nullable(),
	emailUuid: z.uuidv4().nullable(),
});

export const ParticipantEmailV3Array = z.array(ParticipantEmailV3);

export type ParticipantEmailV3 = z.infer<typeof ParticipantEmailV3>;
export type ParticipantEmailV3Array = z.infer<typeof ParticipantEmailV3Array>;

export interface ParticipantEmailMigration {
	old: ParticipantEmailV2;
	new: ParticipantEmailV3;
}

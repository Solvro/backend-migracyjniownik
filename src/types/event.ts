import z from "zod";

export const EventV2 = z.object({
	id: z.number(),
	organizer_id: z.number().nullable(),
	name: z.string(),
	description: z.string().nullable(),
	slug: z.string(),
	start_date: z.date(),
	end_date: z.date(),
	lat: z.number().nullable(),
	long: z.number().nullable(),
	primary_color: z.string().nullable(),
	organizer: z.string().nullable(),
	participants_count: z.number().nullable(),
	photo_url: z.string().nullable(),
	social_media_links: z.array(z.string()).nullable(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	location: z.string().nullable(),
	contact_email: z.string().nullable(),
	terms_link: z.string().nullable(),
});

export const EventV2Array = z.array(EventV2);

export type EventV2 = z.infer<typeof EventV2>;
export type EventV2Array = z.infer<typeof EventV2Array>;

export const EventV3 = z.object({
	uuid: z.uuidv4(),
	name: z.string(),
	links: z.array(z.string()).nullable(),
	policyLinks: z.array(z.string()).nullable(),
	startDate: z.date(),
	endDate: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
	participantsLimit: z.number().nullable(),
	verifiedAt: z.date().nullable(),
	description: z.string().nullable(),
	primaryColor: z.string().nullable(),
	organizerName: z.string().nullable(),
	photoUrl: z.string().nullable(),
	location: z.string().nullable(),
	contactEmail: z.string().nullable(),
	slug: z.string(),
	isPrivate: z.boolean(),
	organizerUuid: z.uuidv4().nullable(),
	registerFormUuid: z.uuidv4().nullable(),
});

export type EventV3 = z.infer<typeof EventV3>;

export interface EventMigration {
	old: EventV2;
	new: EventV3;
}

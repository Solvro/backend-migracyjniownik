import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import { EventV2Array, EventMigration, EventV3 } from "../types/event.js";
import { AdminMigration } from "../types/admin.js";
import { FormMigration } from "../types/form.js";

export const migrateEvents = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	adminsMigration: AdminMigration[]
) => {
	const events = EventV2Array.parse(fromDB);

	const eventsMigration: EventMigration[] = events.map((event) => {
		const newEvent: EventV3 = {
			uuid: uuidv4(),
			name: event.name,
			links: event.social_media_links,
			policyLinks: event.terms_link === null ? null : [event.terms_link],
			startDate: event.start_date,
			endDate: event.end_date,
			createdAt: event.created_at,
			updatedAt: event.updated_at ?? event.created_at,
			participantsLimit: event.participants_count,
			verifiedAt: null,
			description: event.description,
			primaryColor: event.primary_color,
			organizerName: event.organizer,
			photoUrl: event.photo_url,
			location: event.location,
			contactEmail: event.contact_email,
			slug: event.slug,
			isPrivate: false,
			organizerUuid: uuidv4(),
			registerFormUuid: uuidv4(),
		};

		return {
			old: event,
			new: newEvent,
		};
	});

	for (const eventMigration of eventsMigration) {
		// console.log("eventMigration.old.id");
		// console.log(eventMigration.old.id);

		// console.log(formsMigration.map((form) => form.old.event_id).join(","));

		// const cos = formsMigration.find(
		// 	(form) => form.old.event_id === eventMigration.old.id
		// )?.new.uuid;

		// console.log("cos");
		// console.log(cos);

		await sql_v3`INSERT INTO "Events" (uuid, name, links, "policyLinks", "startDate", "endDate", "createdAt", "updatedAt", "participantsLimit", "verifiedAt", "description", "primaryColor", "organizerName", "photoUrl", "location", "contactEmail", "slug", "isPrivate", "organizerUuid", "registerFormUuid") VALUES (${
			eventMigration.new.uuid
		}, ${eventMigration.new.name}, ${eventMigration.new.links}, ${
			eventMigration.new.policyLinks
		}, ${eventMigration.new.startDate}, ${eventMigration.new.endDate}, ${
			eventMigration.new.createdAt
		}, ${eventMigration.new.updatedAt}, ${
			eventMigration.new.participantsLimit
		}, ${eventMigration.new.verifiedAt}, ${
			eventMigration.new.description
		}, ${eventMigration.new.primaryColor}, ${
			eventMigration.new.organizerName
		}, ${eventMigration.new.photoUrl}, ${eventMigration.new.location}, ${
			eventMigration.new.contactEmail
		}, ${eventMigration.new.slug}, ${eventMigration.new.isPrivate}, ${
			adminsMigration.find(
				(admin) => admin.old.id === eventMigration.old.organizer_id
			)?.new.uuid ?? ""
		}, ${null});`;
	}

	return eventsMigration;
};

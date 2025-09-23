import { sql_v3 } from "../db.js";
import { EventMigration } from "../types/event.js";
import { FormMigration } from "../types/form.js";

type EventForm = {
	eventId: number;
	formId: number;
	eventMigration: EventMigration;
	formMigration: FormMigration;
};

export const linkEventsWithForms = async (
	events: EventMigration[],
	forms: FormMigration[]
) => {
	const foundConnectionsSet = new Set<EventForm>();

	for (const event of events) {
		for (const form of forms) {
			if (event.old.id === form.old.event_id) {
				foundConnectionsSet.add({
					eventId: event.old.id,
					formId: form.old.event_id,
					eventMigration: event,
					formMigration: form,
				});
			}
		}
	}

	for (const foundConnection of foundConnectionsSet) {
		await sql_v3`UPDATE "Forms" SET "eventUuid" = ${foundConnection.eventMigration.new.uuid} WHERE "uuid" = ${foundConnection.formMigration.new.uuid}`;
	}
};

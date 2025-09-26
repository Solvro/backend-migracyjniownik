import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import { EmailV2Array, EmailMigration, EmailV3 } from "../types/email.js";
import { EventMigration } from "../types/event.js";
import { FormMigration } from "../types/form.js";

export const migrateEmails = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	events: EventMigration[],
	forms: FormMigration[]
) => {
	const emails = EmailV2Array.parse(fromDB);

	const emailsMigration: EmailMigration[] = emails.map(email => {
		const possibleEvent = events.find(
			event => event.old.id === email.event_id
		);

		const possibleForm = forms.find(form => form.old.id === email.form_id);

		const newEmail: EmailV3 = {
			uuid: uuidv4(),
			name: email.name,
			content: email.content,
			trigger: email.trigger.toUpperCase() as
				| "PARTICIPANT_REGISTERED"
				| "PARTICIPANT_DELETED"
				| "FORM_FILLED"
				| "ATTRIBUTE_CHANGED"
				| "MANUAL",
			triggerValue: email.trigger_value,
			triggerValue2: email.trigger_value_2,
			eventUuid:
				possibleEvent !== undefined ? possibleEvent.new.uuid : null,
			formUuid: possibleForm !== undefined ? possibleForm.new.uuid : null,
			createdAt: email.created_at,
			updatedAt: email.updated_at ?? email.created_at,
		};

		return {
			old: email,
			new: newEmail,
		};
	});

	for (const emailMigration of emailsMigration) {
		await sql_v3`INSERT INTO "Emails" (uuid, name, content, trigger, "triggerValue", "triggerValue2", "eventUuid", "formUuid", "createdAt", "updatedAt") VALUES (
			${emailMigration.new.uuid},
			${emailMigration.new.name},
			${emailMigration.new.content},
			${emailMigration.new.trigger},
			${emailMigration.new.triggerValue},
			${emailMigration.new.triggerValue2},
			${emailMigration.new.eventUuid},
			${emailMigration.new.formUuid},
			${emailMigration.new.createdAt},
			${emailMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated emails");

	return emailsMigration;
};

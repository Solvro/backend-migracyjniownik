import { sql_v3 } from "../db.js";
import { EventMigration } from "../types/event.js";
import { FormMigration } from "../types/form.js";

export const linkRegisterFormsForEvents = async (
	events: EventMigration[],
	forms: FormMigration[]
) => {
	for (const form of forms) {
		if (form.old.is_first_form === false) continue;

		const eventForRegister = events.find(
			event => event.old.id === form.old.event_id
		);

		if (eventForRegister === undefined) {
			console.error(
				`Nie znaleziono eventu dla register forma o ID eventu ${form.old.event_id}`
			);
			process.exit(1);
		}

		await sql_v3`UPDATE "Events" SET "registerFormUuid" = ${form.new.uuid} WHERE "uuid" = ${eventForRegister.new.uuid}`;
	}
};

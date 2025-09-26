import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	AttributeV2Array,
	AttributeMigration,
	AttributeV3,
} from "../types/attribute.js";
import { EventMigration } from "../types/event.js";

export const migrateAttributes = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	events: EventMigration[]
) => {
	const attributes = AttributeV2Array.parse(fromDB);

	const attributesMigration: AttributeMigration[] = attributes.map(
		attribute => {
			const possibleEvent = events.find(
				event => event.old.id === attribute.event_id
			);

			if (possibleEvent === undefined) {
				console.error(
					`Nie znaleziono eventu o ID ${attribute.event_id}`
				);
				process.exit(1);
			}

			let type:
				| "number"
				| "date"
				| "file"
				| "text"
				| "select"
				| "block"
				| "time"
				| "datetime"
				| "email"
				| "tel"
				| "color"
				| "checkbox"
				| "textArea"
				| "multiSelect" = "number";

			if (attribute.type === "textarea") {
				type = "textArea";
			} else if (attribute.type === "multiselect") {
				type = "multiSelect";
			} else {
				type = attribute.type;
			}

			const newAttribute: AttributeV3 = {
				uuid: uuidv4(),
				name: attribute.name,
				options: attribute.options,
				order: attribute.order,
				showInList: attribute.show_in_list,
				type: type,
				eventUuid: possibleEvent.new.uuid,
				createdAt: attribute.created_at,
				updatedAt: attribute.updated_at ?? attribute.created_at,
			};

			return {
				old: attribute,
				new: newAttribute,
			};
		}
	);

	for (const attributeMigration of attributesMigration) {
		await sql_v3`INSERT INTO "Attributes" (uuid, name, "options", "order", "showInList", "type", "eventUuid", "createdAt", "updatedAt") VALUES (
			${attributeMigration.new.uuid},
			${attributeMigration.new.name},
			${attributeMigration.new.options},
			${attributeMigration.new.order},
			${attributeMigration.new.showInList},
			${attributeMigration.new.type},
			${attributeMigration.new.eventUuid},
			${attributeMigration.new.createdAt},
			${attributeMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated attributes");

	return attributesMigration;
};

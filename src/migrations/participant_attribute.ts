import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	ParticipantAttributeMigration,
	ParticipantAttributeV2Array,
	ParticipantAttributeV3,
} from "../types/participant_attribute.js";
import { AttributeMigration } from "../types/attribute.js";
import { ParticipantMigration } from "../types/participant.js";

export const migrateParticipantAttributes = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	attributes: AttributeMigration[],
	participants: ParticipantMigration[]
) => {
	const participantAttributes = ParticipantAttributeV2Array.parse(fromDB);

	const participantAttributesMigration: ParticipantAttributeMigration[] =
		participantAttributes.map(participantAttribute => {
			const possibleAttribute = attributes.find(
				attribute =>
					attribute.old.id === participantAttribute.attribute_id
			);

			if (possibleAttribute === undefined) {
				console.error(
					`Nie znaleziono atrybutu o ID ${participantAttribute.attribute_id}`
				);
				process.exit(1);
			}

			const possibleParticipant = participants.find(
				participant =>
					participant.old.id === participantAttribute.participant_id
			);

			if (possibleParticipant === undefined) {
				console.error(
					`Nie znaleziono participanta o ID ${participantAttribute.participant_id}`
				);
				process.exit(1);
			}

			const newParticipantAttribute: ParticipantAttributeV3 = {
				uuid: uuidv4(),
				value: participantAttribute.value,
				attributeUuid: possibleAttribute.new.uuid,
				participantUuid: possibleParticipant.new.uuid,
				createdAt: participantAttribute.created_at,
				updatedAt:
					participantAttribute.updated_at ??
					participantAttribute.created_at,
			};

			return {
				old: participantAttribute,
				new: newParticipantAttribute,
			};
		});

	for (const participantAttributeMigration of participantAttributesMigration) {
		await sql_v3`INSERT INTO "ParticipantsAttributes" (uuid, value, "attributeUuid", "participantUuid", "createdAt", "updatedAt") VALUES (
			${participantAttributeMigration.new.uuid},
			${participantAttributeMigration.new.value},
			${participantAttributeMigration.new.attributeUuid},
			${participantAttributeMigration.new.participantUuid},
			${participantAttributeMigration.new.createdAt},
			${participantAttributeMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated participantsAttributes");

	return participantAttributesMigration;
};

import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	ParticipantV2Array,
	ParticipantMigration,
	ParticipantV3,
} from "../types/participant.js";
import { EventMigration } from "../types/event.js";

//PO EVENTACH, chociaż jest to jasne bo musi mieć migracje jego xd
export const migrateParticipants = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	eventsMigration: EventMigration[]
) => {
	const participants = ParticipantV2Array.parse(fromDB);

	const participantsMigration: ParticipantMigration[] = participants.map(
		participant => {
			const newParticipant: ParticipantV3 = {
				uuid: uuidv4(),
				eventUuid:
					eventsMigration.find(
						eventMigration =>
							eventMigration.old.id === participant.event_id
					)?.new.uuid ?? "",
				email: participant.email,
				createdAt: participant.created_at,
				updatedAt: participant.updated_at ?? participant.created_at,
			};

			return {
				old: participant,
				new: newParticipant,
			};
		}
	);

	for (const participantMigration of participantsMigration) {
		await sql_v3`INSERT INTO "Participants" (uuid, "eventUuid", email, "createdAt", "updatedAt") VALUES (
			${participantMigration.new.uuid},
			${participantMigration.new.eventUuid},
			${participantMigration.new.email},
			${participantMigration.new.createdAt},
			${participantMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated participants");

	return participantsMigration;
};

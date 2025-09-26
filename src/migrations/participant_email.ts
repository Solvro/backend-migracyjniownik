import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	ParticipantEmailV2Array,
	ParticipantEmailMigration,
	ParticipantEmailV3,
} from "../types/participant_email.js";
import { ParticipantMigration } from "../types/participant.js";
import { EmailMigration } from "../types/email.js";

export const migrateParticipantEmails = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	emails: EmailMigration[],
	participants: ParticipantMigration[]
) => {
	const participantEmails = ParticipantEmailV2Array.parse(fromDB);

	const participantEmailsMigration: ParticipantEmailMigration[] =
		participantEmails.map(participantEmail => {
			const possibleParticipant = participants.find(
				participant =>
					participant.old.id === participantEmail.participant_id
			);

			if (possibleParticipant === undefined) {
				console.error(
					`Nie znaleziono participanta o ID ${participantEmail.participant_id}`
				);
				process.exit(1);
			}

			const possibleEmail = emails.find(
				email => email.old.id === participantEmail.email_id
			);

			if (possibleEmail === undefined) {
				console.error(
					`Nie znaleziono emaila o ID ${participantEmail.email_id}`
				);
				process.exit(1);
			}

			const newParticipantEmail: ParticipantEmailV3 = {
				uuid: uuidv4(),
				sendAt: participantEmail.send_at,
				sendBy: participantEmail.send_by,
				status: participantEmail.status,
				participantUuid: possibleParticipant.new.uuid,
				emailUuid: possibleEmail.new.uuid,
				createdAt: participantEmail.created_at,
				updatedAt:
					participantEmail.updated_at ?? participantEmail.created_at,
			};

			return {
				old: participantEmail,
				new: newParticipantEmail,
			};
		});

	for (const participantEmailMigration of participantEmailsMigration) {
		await sql_v3`INSERT INTO "ParticipantsEmails" (uuid, "sendAt", "sendBy", status, "participantUuid", "emailUuid", "createdAt", "updatedAt") VALUES (
			${participantEmailMigration.new.uuid},
			${participantEmailMigration.new.sendAt},
			${participantEmailMigration.new.sendBy},
			${participantEmailMigration.new.status},
			${participantEmailMigration.new.participantUuid},
			${participantEmailMigration.new.emailUuid},
			${participantEmailMigration.new.createdAt},
			${participantEmailMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated participantsEmails");

	return participantEmailsMigration;
};

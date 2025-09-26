import "dotenv/config";
import { sql_v2 } from "./db.js";
import { migrateAdmins } from "./migrations/admin.js";
import { migrateEvents } from "./migrations/event.js";
import { migrateForms } from "./migrations/form.js";
import { linkRegisterFormsForEvents } from "./linkers/event_register_form.js";
import { migrateAdminPermissions } from "./migrations/admin_permission.js";
import { migratePermissions } from "./migrations/permission.js";
import { migrateAttributes } from "./migrations/attribute.js";
import { migrateAuthAccessTokens } from "./migrations/auth_access_tokens.js";
import { migrateBlocks } from "./migrations/block.js";
import { linkBlockParents } from "./linkers/block_parents.js";
import { migrateEmails } from "./migrations/email.js";
import { migrateFormDefinitions } from "./migrations/form_definition.js";
import { migrateParticipantAttributes } from "./migrations/participant_attribute.js";
import { migrateParticipants } from "./migrations/participant.js";
import { migrateParticipantEmails } from "./migrations/participant_email.js";

const main = async () => {
	const adminsPermissionsV2 = await sql_v2`SELECT * FROM "admin_permissions"`;
	const adminsV2 = await sql_v2`SELECT * FROM "admins"`;
	const attributesV2 = await sql_v2`SELECT * FROM "attributes"`;
	// const authAccessTokensV2 = await sql_v2`SELECT * FROM "auth_access_tokens"`;
	const blocksV2 = await sql_v2`SELECT * FROM "blocks"`;
	const emailsV2 = await sql_v2`SELECT * FROM "emails"`;
	const eventsV2 = await sql_v2`SELECT * FROM "events"`;
	const formsV2 = await sql_v2`SELECT * FROM "forms"`;
	const formsDefinitionsV2 = await sql_v2`SELECT * FROM "form_definitions"`;
	const participantsV2 = await sql_v2`SELECT * FROM "participants"`;
	const participantsAttributesV2 =
		await sql_v2`SELECT * FROM "participant_attributes"`;
	const participantEmailsV2 =
		await sql_v2`SELECT * FROM "participant_emails"`;
	const permissionsV2 = await sql_v2`SELECT * FROM "permissions"`;

	const adminsMigration = await migrateAdmins(adminsV2);
	const eventsMigration = await migrateEvents(eventsV2, adminsMigration);
	const formsMigration = await migrateForms(formsV2, eventsMigration);

	await linkRegisterFormsForEvents(eventsMigration, formsMigration);

	const permissionsMigration = await migratePermissions(permissionsV2);

	await migrateAdminPermissions(
		adminsPermissionsV2,
		permissionsMigration,
		eventsMigration,
		adminsMigration
	);

	const attributesMigration = await migrateAttributes(
		attributesV2,
		eventsMigration
	);
	// await migrateAuthAccessTokens(authAccessTokensV2, adminsMigration);
	const blocksMigration = await migrateBlocks(blocksV2, attributesMigration);

	await linkBlockParents(blocksMigration);

	const emailsMigration = await migrateEmails(
		emailsV2,
		eventsMigration,
		formsMigration
	);
	await migrateFormDefinitions(
		formsDefinitionsV2,
		attributesMigration,
		formsMigration
	);

	const participantsMigration = await migrateParticipants(
		participantsV2,
		eventsMigration
	);

	console.log("Teraz długo zajmie migrowanie atrybutów participantów (>10k)");
	await migrateParticipantAttributes(
		participantsAttributesV2,
		attributesMigration,
		participantsMigration
	);

	console.log(
		"Teraz troche mniej ale nadal długo zajmie migrowanie maili participantów (~5k)"
	);
	await migrateParticipantEmails(
		participantEmailsV2,
		emailsMigration,
		participantsMigration
	);

	console.log("Migration done");

	process.exit(0);
};

main();

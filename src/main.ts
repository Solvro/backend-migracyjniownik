import "dotenv/config";
import { sql_v2, sql_v3 } from "./db.js";
import { migrateAdmins } from "./migrations/admin.js";
import { migrateEvents } from "./migrations/event.js";
import { migrateForms } from "./migrations/form.js";
import { readFileSync } from "fs";
import { linkEventsWithForms } from "./linkers/event_form.js";

const main = async () => {
	const adminsV2 = await sql_v2`SELECT * FROM "admins"`;
	const eventsV2 = await sql_v2`SELECT * FROM "events"`;
	const formsV2 = await sql_v2`SELECT * FROM "forms"`;
	// const eventsFromDBV3 = await sql_v3`SELECT * FROM "Events"`;

	// console.log(formsV2);

	const adminsMigration = await migrateAdmins(adminsV2);
	const formsMigration = await migrateForms(formsV2);
	const eventsMigration = await migrateEvents(eventsV2, adminsMigration);

	await linkEventsWithForms(eventsMigration, formsMigration);

	// const foreignKeysSQL = readFileSync("./foreign_keys.sql", {
	// 	encoding: "utf-8",
	// });

	// await sql_v2`${foreignKeysSQL}`;

	console.log("done");

	// console.log(eventsMigration);
};

main();

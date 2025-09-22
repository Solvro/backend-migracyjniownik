import "dotenv/config";
import { sql_v2, sql_v3 } from "./db.js";
import { migrateAdmins } from "./migrations/admin.js";
import { migrateEvents } from "./migrations/event.js";
import { migrateForms } from "./migrations/form.js";

const main = async () => {
	const adminsV2 = await sql_v2`SELECT * FROM "Admins"`;
	const eventsV2 = await sql_v2`SELECT * FROM "events"`;
	const formsV2 = await sql_v2`SELECT * FROM "forms"`;
	// const eventsFromDBV3 = await sql_v3`SELECT * FROM "Events"`;

	const adminsMigration = await migrateAdmins(adminsV2);
	const formsMigration = await migrateForms(formsV2);
	await migrateEvents(eventsV2, adminsMigration, formsMigration);

	console.log("done");

	// console.log(eventsMigration);
};

main();

import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import { FormMigration, FormV2Array, FormV3 } from "../types/form.js";

export const migrateForms = async (
	fromDB: postgres.RowList<postgres.Row[]>
) => {
	const forms = FormV2Array.parse(fromDB);

	const formsMigration: FormMigration[] = forms.map((form) => {
		const newform: FormV3 = {
			uuid: uuidv4(),
			name: form.name,
			isEditable: false,
			createdAt: form.created_at,
			updatedAt: form.updated_at ?? form.created_at,
			openDate: null,
			closeDate: null,
			description: form.description,
			eventUuid: uuidv4(),
		};

		return {
			old: form,
			new: newform,
		};
	});

	for (const formMigration of formsMigration) {
		await sql_v3`INSERT INTO "Forms" (uuid, name, "isEditable", "createdAt", "updatedAt", "openDate", "closeDate", description, "eventUuid") VALUES (${formMigration.new.uuid}, ${formMigration.new.name}, ${formMigration.new.isEditable}, ${formMigration.new.createdAt}, ${formMigration.new.updatedAt}, ${formMigration.new.openDate}, ${formMigration.new.closeDate}, ${formMigration.new.description}, ${formMigration.new.eventUuid});`;
	}

	return formsMigration;
};

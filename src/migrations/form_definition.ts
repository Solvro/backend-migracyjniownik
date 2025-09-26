import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import {
	FormDefinitionV2Array,
	FormDefinitionMigration,
	FormDefinitionV3,
} from "../types/form_definition.js";
import { AttributeMigration } from "../types/attribute.js";
import { FormMigration } from "../types/form.js";

export const migrateFormDefinitions = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	attributes: AttributeMigration[],
	forms: FormMigration[]
) => {
	const formDefinitions = FormDefinitionV2Array.parse(fromDB);

	const formDefinitionsMigration: FormDefinitionMigration[] =
		formDefinitions.map(formDefinition => {
			const possibleForm = forms.find(
				form => form.old.id === formDefinition.form_id
			);

			if (possibleForm === undefined) {
				console.error(
					`Nie znaleziono forma o ID ${formDefinition.form_id}`
				);
				process.exit(1);
			}

			const possibleAttribute = attributes.find(
				attribute => attribute.old.id === formDefinition.attribute_id
			);

			if (possibleAttribute === undefined) {
				console.error(
					`Nie znaleziono forma o ID ${formDefinition.attribute_id}`
				);
				process.exit(1);
			}

			const newFormDefinition: FormDefinitionV3 = {
				uuid: uuidv4(),
				order: formDefinition.order,
				isRequired: formDefinition.is_required,
				formUuid: possibleForm.new.uuid,
				attributeUuid: possibleAttribute.new.uuid,
				createdAt: formDefinition.created_at,
				updatedAt:
					formDefinition.updated_at ?? formDefinition.created_at,
			};

			return {
				old: formDefinition,
				new: newFormDefinition,
			};
		});

	for (const formDefinitionMigration of formDefinitionsMigration) {
		await sql_v3`INSERT INTO "FormsDefinitions" (uuid, "order", "isRequired", "formUuid", "attributeUuid", "createdAt", "updatedAt") VALUES (
			${formDefinitionMigration.new.uuid},
			${formDefinitionMigration.new.order},
			${formDefinitionMigration.new.isRequired},
			${formDefinitionMigration.new.formUuid},
			${formDefinitionMigration.new.attributeUuid},
			${formDefinitionMigration.new.createdAt},
			${formDefinitionMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated formsDefinitions");

	return formDefinitionsMigration;
};

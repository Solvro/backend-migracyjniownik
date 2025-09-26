import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";
import { sql_v3 } from "../db.js";
import { BlockV2Array, BlockMigration, BlockV3 } from "../types/block.js";
import { AttributeMigration } from "../types/attribute.js";

export const migrateBlocks = async (
	fromDB: postgres.RowList<postgres.Row[]>,
	attributes: AttributeMigration[]
) => {
	const blocks = BlockV2Array.parse(fromDB);

	const blocksMigration: BlockMigration[] = blocks.map(block => {
		const possibleAttribute = attributes.find(
			attribute => attribute.old.id === block.attribute_id
		);

		if (possibleAttribute === undefined) {
			console.error(`Nie znaleziono atrybutu o ID ${block.attribute_id}`);
			process.exit(1);
		}

		const newBlock: BlockV3 = {
			uuid: uuidv4(),
			capacity: block.capacity,
			description: block.description,
			name: block.name,
			attributeUuid: possibleAttribute.new.uuid,
			order: null,
			parentUuid: null, //potem linkowane
			createdAt: block.created_at,
			updatedAt: block.updated_at ?? block.created_at,
		};

		return {
			old: block,
			new: newBlock,
		};
	});

	for (const blockMigration of blocksMigration) {
		await sql_v3`INSERT INTO "Blocks" (uuid, capacity, description, name, "attributeUuid", "order", "parentUuid", "createdAt", "updatedAt") VALUES (
			${blockMigration.new.uuid},
			${blockMigration.new.capacity},
			${blockMigration.new.description},
			${blockMigration.new.name},
			${blockMigration.new.attributeUuid},
			${blockMigration.new.order},
			${blockMigration.new.parentUuid},
			${blockMigration.new.createdAt},
			${blockMigration.new.updatedAt}
		);`;
	}

	console.log("Migrated blocks");

	return blocksMigration;
};

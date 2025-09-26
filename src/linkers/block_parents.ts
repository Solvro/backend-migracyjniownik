import { sql_v3 } from "../db.js";
import { BlockMigration } from "../types/block.js";

export const linkBlockParents = async (blocks: BlockMigration[]) => {
	for (const block of blocks) {
		if (block.old.parent_id !== null) {
			const parentBlock = blocks.find(
				parentBlock => parentBlock.old.id === block.old.parent_id
			);

			if (parentBlock === undefined) {
				console.error(
					`Nie znaleziono bloku rodzica dla bloku o starym ID ${block.old.id} (szukane parent_id: ${block.old.parent_id})`
				);
				process.exit(1);
			}

			await sql_v3`UPDATE "Blocks" SET "parentUuid" = ${parentBlock.new.uuid} WHERE "uuid" = ${block.new.uuid}`;
		}
	}
};

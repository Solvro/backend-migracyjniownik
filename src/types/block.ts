import z from "zod";

export const BlockV2 = z.object({
	id: z.number(),
	name: z.string().nullable(),
	description: z.string().nullable(),
	capacity: z.number().nullable(),
	parent_id: z.number().nullable(),
	attribute_id: z.number().nullable(),
	created_at: z.date(),
	updated_at: z.date().nullable(),
	is_root_block: z.boolean(),
});

export const BlockV2Array = z.array(BlockV2);

export type BlockV2 = z.infer<typeof BlockV2>;
export type BlockV2array = z.infer<typeof BlockV2Array>;

export const BlockV3 = z.object({
	uuid: z.uuidv4(),
	createdAt: z.date(),
	updatedAt: z.date(),
	capacity: z.number().nullable(),
	order: z.number().nullable(),
	name: z.string().nullable(),
	description: z.string().nullable(),
	parentUuid: z.uuidv4().nullable(),
	attributeUuid: z.uuidv4().nullable(),
});

export const BlockV3Array = z.array(BlockV3);

export type BlockV3 = z.infer<typeof BlockV3>;
export type BlockV3Array = z.infer<typeof BlockV3Array>;

export interface BlockMigration {
	old: BlockV2;
	new: BlockV3;
}

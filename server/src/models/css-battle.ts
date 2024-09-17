import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const Tags = {
	Easy: "Easy",
	Medium: "Medium",
	Hard: "Hard",
} as const;

const cssBattleSchema = z.object({
	title: z.string().min(1).max(200),
	description: z.string().min(1).max(1000),
	isActive: z.boolean(),
	colors: z.array(z.string()),
	code: z.string(),
	image: z.string(),
	competition: z.instanceof(mongoose.Types.ObjectId),
	tags: z.array(z.enum([Tags.Easy, Tags.Medium, Tags.Hard])),
	createdAt: z.date(),
	updatedAt: z.date(),
});

type ICSSBattle = z.infer<typeof cssBattleSchema>;

const mongooseCSSBattleSchema = new Schema<ICSSBattle>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 200,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		colors: [
			{
				type: String,
				validate: {
					validator: (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v),
					message:
						"Invalid color format. Use hexadecimal format (e.g., #RRGGBB)",
				},
			},
		],
		code: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		competition: {
			type: Schema.Types.ObjectId,
			ref: "Competition",
			required: true,
		},
		tags: [
			{
				type: String,
				enum: Object.values(Tags),
			},
		],
	},
	{
		timestamps: true,
	},
);

mongooseCSSBattleSchema.index({ title: 1, competition: 1 });

export const CSSBattle = mongoose.model<ICSSBattle>(
	"CSSBattle",
	mongooseCSSBattleSchema,
);

export { cssBattleSchema, Tags };

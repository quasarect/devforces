import mongoose, { Schema, Document } from "mongoose";

enum Tags {
	Easy = "Easy",
	Medium = "Medium",
	Hard = "Hard",
}

interface ICSSBattle extends Document {
	title: string;
	description: string;
	isActive: boolean;
	colors: string[];
	code: string;
	image: string;
	competition: Schema.Types.ObjectId;
	tags: Tags[];
	createdAt: Date;
	updatedAt: Date;
}

const cssBattleSchema = new Schema<ICSSBattle>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: false,
		},
		colors: [
			{
				type: String,
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
				enum: ["Easy", "Medium", "Hard"],
			},
		],
	},
	{
		timestamps: true,
	},
);

export const CSSBattle = mongoose.model<ICSSBattle>(
	"CSSBattle",
	cssBattleSchema,
);

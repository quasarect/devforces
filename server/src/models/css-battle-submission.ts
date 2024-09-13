import mongoose, { Schema, Document } from "mongoose";

interface ICSSBattleSubmission extends Document {
	user: Schema.Types.ObjectId;
	cssBattle: Schema.Types.ObjectId;
	score: number;
	code: string;
	createdAt: Date;
	updatedAt: Date;
}

const cssBattleSubmission = new Schema<ICSSBattleSubmission>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		cssBattle: {
			type: Schema.Types.ObjectId,
			ref: "CSSBattle",
			required: true,
		},
		score: {
			type: Number,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const CSSBattleSubmission = mongoose.model<ICSSBattleSubmission>(
	"CSSBattleSubmission",
	cssBattleSubmission,
);

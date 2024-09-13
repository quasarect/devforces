import mongoose, { Schema, Document } from "mongoose";

interface ICompetition extends Document {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	logo: string;
	creator: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const competitionSchema = new Schema<ICompetition>(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		logo: {
			type: String,
			require: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

export const Competition = mongoose.model<ICompetition>(
	"Competition",
	competitionSchema,
);

import mongoose, { Schema, Document } from "mongoose";

enum CompetitionRegistrationStatus {
	pending = "pending",
	confirmed = "confirmed",
	cancelled = "cancelled",
}

interface ICompetitionRegistration extends Document {
	user: Schema.Types.ObjectId;
	competition: Schema.Types.ObjectId;
	status: CompetitionRegistrationStatus;
	createdAt: Date;
	updatedAt: Date;
}

const competitionRegistrationSchema = new Schema<ICompetitionRegistration>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		competition: {
			type: Schema.Types.ObjectId,
			ref: "Competition",
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled"],
			default: CompetitionRegistrationStatus.pending,
		},
	},
	{
		timestamps: true,
	},
);

export const CompetitionRegistration = mongoose.model<ICompetitionRegistration>(
	"CompetitionRegistration",
	competitionRegistrationSchema,
);

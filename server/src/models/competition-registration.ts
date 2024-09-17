import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const CompetitionRegistrationStatus = {
	pending: "pending",
	confirmed: "confirmed",
	cancelled: "cancelled",
} as const;

const competitionRegistrationSchema = z.object({
	user: z.instanceof(mongoose.Types.ObjectId),
	competition: z.instanceof(mongoose.Types.ObjectId),
	status: z.enum([
		CompetitionRegistrationStatus.pending,
		CompetitionRegistrationStatus.confirmed,
		CompetitionRegistrationStatus.cancelled,
	]),
	createdAt: z.date(),
	updatedAt: z.date(),
});

type ICompetitionRegistration = z.infer<typeof competitionRegistrationSchema>;

const mongooseCompetitionRegistrationSchema =
	new Schema<ICompetitionRegistration>(
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
				enum: Object.values(CompetitionRegistrationStatus),
				default: CompetitionRegistrationStatus.pending,
			},
		},
		{
			timestamps: true,
		},
	);

mongooseCompetitionRegistrationSchema.index(
	{ user: 1, competition: 1 },
	{ unique: true },
);

export const CompetitionRegistration = mongoose.model<ICompetitionRegistration>(
	"CompetitionRegistration",
	mongooseCompetitionRegistrationSchema,
);

export { competitionRegistrationSchema, CompetitionRegistrationStatus };

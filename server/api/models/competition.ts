import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const competitionSchema = z.object({
	title: z.string().min(1).max(200),
	description: z.string().min(1).max(1000),
	startDate: z.date(),
	endDate: z.date(),
	logo: z.string(),
	creator: z.instanceof(mongoose.Types.ObjectId),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

type ICompetition = z.infer<typeof competitionSchema>;

const mongooseCompetitionSchema = new Schema<ICompetition>(
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
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (this: ICompetition, value: Date) {
					return this.startDate <= value;
				},
				message: "End date must be after or equal to start date",
			},
		},
		logo: {
			type: String,
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

mongooseCompetitionSchema.index({ title: 1, creator: 1 });

export const Competition = mongoose.model<ICompetition>(
	"Competition",
	mongooseCompetitionSchema,
);

export { competitionSchema };

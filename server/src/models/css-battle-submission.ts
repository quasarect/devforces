import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const cssBattleSubmissionSchema = z.object({
	user: z.instanceof(mongoose.Types.ObjectId),
	cssBattle: z.instanceof(mongoose.Types.ObjectId),
	score: z.number().min(0).max(100),
	code: z.string().min(1),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

type ICSSBattleSubmission = z.infer<typeof cssBattleSubmissionSchema>;

const mongooseCSSBattleSubmissionSchema = new Schema<ICSSBattleSubmission>(
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
			min: 0,
			max: 100,
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

mongooseCSSBattleSubmissionSchema.index(
	{ user: 1, cssBattle: 1 },
	{ unique: true },
);

export const CSSBattleSubmission = mongoose.model<ICSSBattleSubmission>(
	"CSSBattleSubmission",
	mongooseCSSBattleSubmissionSchema,
);

export { cssBattleSubmissionSchema };

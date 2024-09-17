import mongoose, { Schema } from "mongoose";
import { z } from "zod";

const userSchema = z.object({
	name: z.string().min(1).max(100),
	email: z.string().email(),
	username: z.string().min(3).max(30),
	pfp: z.string().optional(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

type IUser = z.infer<typeof userSchema>;

const mongooseUserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
				message: "Invalid email format",
			},
		},
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 30,
		},
		pfp: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

mongooseUserSchema.index({ email: 1, username: 1 });

export const User = mongoose.model<IUser>("User", mongooseUserSchema);

export { userSchema };

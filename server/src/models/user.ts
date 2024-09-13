import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
	name: string;
	email: string;
	username: string;
	pfp: string;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		username: { type: String, unique: true, required: true },
		pfp: { type: String },
	},
	{
		timestamps: true,
	},
);

export const User = mongoose.model<IUser>("User", userSchema);

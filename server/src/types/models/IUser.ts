import { Types } from "mongoose";

export interface IUser {
	_id: Types.ObjectId;
	name: string;
	email: string;
	profileUrl: string;
	institution: Types.ObjectId;
}

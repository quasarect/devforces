import { Request, Response, NextFunction } from "express";

import HttpStatusCode from "../utils/HttpStatusCode";
import { HttpException } from "../exceptions/HttpException";

interface CustomError extends Error {
	status?: number;
	statusCode?: number;
	data?: any;
}

export const handleNotFound = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	next(new HttpException(HttpStatusCode.NOT_FOUND, "Not Found"));
};

export const handleGlobalError = (
	error: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	const status: number =
		error.statusCode ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
	const message: string = error.message;
	const data: any = error.data;
	res.status(status).json({ message, data });
};

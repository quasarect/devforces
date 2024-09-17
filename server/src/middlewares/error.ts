import { Request, Response, NextFunction } from "express";
import HttpException from "../types/exceptions/HttpException";
import HttpStatusCode from "../types/express/status_codes";
export const handleNotFound = (
	req: Request,
	res: Response,
	next: NextFunction,
): void => {
	return next(new HttpException(HttpStatusCode.NOT_FOUND, "Not Found"));
};

export const handleGlobalError = (
	error: HttpException,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const status: number = error.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
	const message: string = error.message;
	const data: any = error.data;
	return res.status(status).json({ message, data });
};

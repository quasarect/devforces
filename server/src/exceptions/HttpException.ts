export class HttpException extends Error {
	status: number;
	message: string;
	data?: any;

	constructor(status: number, message: string, data?: any) {
		super(message);
		this.status = status;
		this.message = message;
		this.data = data;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

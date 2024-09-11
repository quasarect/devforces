// import winston from "winston";
// // import { ILogResource } from "../types/ILogResource";

// // Logger Configuration
// const pulumiLogger = winston.createLogger({
// 	level: process.env.LOG_LEVEL || "info", // Use environment variable for log level
// 	format: winston.format.combine(
// 		winston.format.timestamp({
// 			format: "YYYY-MM-DD HH:mm:ss",
// 		}),
// 		winston.format.simple(), // Apply the custom format
// 	),
// 	transports: [
// 		new winston.transports.Console({
// 			format: winston.format.combine(
// 				winston.format.colorize(), // Adds color to the output for console
// 			),
// 		}),
// 		new winston.transports.File({
// 			filename: "pulumi-infrastructure.log",
// 		}),
// 	],
// });

// export default pulumiLogger;

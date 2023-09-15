
import winston from "winston";
import { customAlphabet } from "nanoid";

export function generateCartId() {
    const nanoid = customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        25,
    );
    return nanoid();
}


export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.colorize({ all: true }),
        }),
        new winston.transports.File({
            filename: "./errors.log",
            level: "warn",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} ${level}: ${message}`;
                }),
            ),
        }),
    ],
});
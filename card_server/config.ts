import winston from 'winston';
const { combine, timestamp, label } = winston.format;

/**
 * The custom transports for all logs
 */
const defaultTransports = [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'app.log', level: 'debug', })
]

/**
 * Create a new logger with standard configuration and a custom label
 * @param {string} customLabel the label of the logger
 */
export function createLogger(customLabel: string) {
    return winston.createLogger({
        level: 'info',
        format: combine(
            label({ label: customLabel }),
            timestamp(),
            winston.format.prettyPrint()
        ),
        transports: defaultTransports
    });
}

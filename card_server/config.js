const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

/**
 * The standard custom format for console logs
 */
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

/**
 * The custom transports for all logs
 */
const transports = {
    console: new winston.transports.Console({ level: 'debug' }),
    file: new winston.transports.File({ filename: 'combined.log', level: 'error', })
};

/**
 * Create a new logger with standard configuration and a custom label
 * @param {string} customLabel the label of the logger
 */
function createLogger(customLabel) {
    return winston.createLogger({
        level: 'info',
        format: combine(
            label({ label: customLabel }),
            timestamp(),
            winston.format.prettyPrint()
        ),
        transports: [
            new winston.transports.Console(),
        ]
    });
}

module.exports = {
    createLogger
}
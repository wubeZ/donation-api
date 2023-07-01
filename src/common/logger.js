import {pino} from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
        },
    },
    level: process.env.LOG_LEVEL || 'info',
    name: process.env.APP_ID || 'app',
});

export default logger;
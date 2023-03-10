import * as log from 'std/log/mod.ts';

import { LogFn, LoggerContract } from './logger.types.ts';

export class Logger implements LoggerContract {
    public readonly debug: LogFn;
    public readonly info: LogFn;
    public readonly warning: LogFn;
    public readonly error: LogFn;
    public readonly critical: LogFn;

    constructor() {
        log.setup({
            //define handlers
            handlers: {
                console: new log.handlers.ConsoleHandler('DEBUG', {
                    formatter: '{datetime} {levelName} {msg}',
                }),
            },
            //assign handlers to loggers
            loggers: {
                default: {
                    level: 'NOTSET',
                    handlers: ['console'],
                },
            },
        });

        const logger = log.getLogger('default');

        this.critical = logger.critical.bind(logger);
        this.error = logger.error.bind(logger);
        this.warning = logger.warning.bind(logger);
        this.info = logger.info.bind(logger);
        this.debug = logger.info.bind(logger);
    }
}

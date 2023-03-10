import { ErrorDetails } from '../error/error.types.ts';

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical',
}

export interface LogFn {
    (msg: string, ...args: any[]): void;
    (obj: ErrorDetails): void;
}

export interface LoggerContract extends Record<LogLevel, unknown> {}

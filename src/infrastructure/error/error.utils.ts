import { ZodError } from 'zod';

import { isObject } from '../../utils/index.ts';
import { InternalError } from './internal-error.ts';
import { ErrorDetails, ResponseObject } from './error.types.ts';
import { PublicNonRecoverableError } from './public-non-recoverable-error.ts';

export function resolveResponseObject(error: ErrorDetails): ResponseObject {
    if (error instanceof PublicNonRecoverableError) {
        return {
            statusCode: error.httpStatusCode ?? 500,
            payload: {
                message: error.message,
                errorCode: error.errorCode,
                details: error.details,
            },
        };
    }

    if (error instanceof ZodError) {
        return {
            statusCode: 400,
            payload: {
                message: 'Invalid params',
                errorCode: 'VALIDATION_ERROR',
                details: {
                    error: error.issues,
                },
            },
        };
    }

    return {
        statusCode: 500,
        payload: {
            message: 'Internal server error',
            errorCode: 'INTERNAL_SERVER_ERROR',
        },
    };
}

export function resolveLogObject(error: unknown, reqId?: string): ErrorDetails {
    if (error instanceof InternalError) {
        return {
            message: error.message,
            code: error.errorCode,
            reqId,
            details: error.details ? JSON.stringify(error.details) : undefined,
            error: stdErrorSerializers({
                name: error.name,
                message: error.message,
                stack: error.stack,
            }),
        };
    }

    return {
        reqId,
        message: isObject(error) ? error.message : JSON.stringify(error),
        error: error instanceof Error ? stdErrorSerializers(error) : error,
    };
}

function stdErrorSerializers(error: Error) {
    return {
        name: error.name,
        message: error.message,
        stack: error.stack,
    };
}

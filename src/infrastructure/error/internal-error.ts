import { ErrorDetails, InternalErrorParams } from './error.types.ts';

export class InternalError extends Error {
    readonly details?: ErrorDetails;
    readonly errorCode: string;

    constructor(params: InternalErrorParams) {
        super(params.message);

        this.name = 'InternalError';
        this.details = params.details;
        this.errorCode = params.errorCode;
    }
}

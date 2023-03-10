import { CommonErrorParams } from './error.types.ts';
import { PublicNonRecoverableError } from './public-non-recoverable-error.ts';

export class EntityNotFoundError extends PublicNonRecoverableError {
    constructor(params: CommonErrorParams) {
        super({
            message: params.message,
            errorCode: 'ENTITY_NOT_FOUND',
            httpStatusCode: 404,
            details: params.details,
        });
    }
}

export type ErrorDetails = Record<string, any>;

export type ResponseObject = {
    statusCode: number;
    payload: {
        message: string;
        errorCode: string | unknown;
        details?: ErrorDetails;
    };
};

export type InternalErrorParams = {
    message: string;
    errorCode: string;
    details?: ErrorDetails;
};

export type CommonErrorParams = {
    message: string;
    details?: ErrorDetails;
};

export type PublicNonRecoverableErrorParams = {
    message: string;
    errorCode: string;
    details?: ErrorDetails;
    httpStatusCode?: number;
};

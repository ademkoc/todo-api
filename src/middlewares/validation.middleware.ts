import { ZodSchema } from '../schemas/index.ts';
import { RouterMiddleware } from '../infrastructure/index.ts';

export type RequestValidation<TParams, TQuery, TBody> = {
    params?: ZodSchema<TParams>;
    query?: ZodSchema<TQuery>;
    body?: ZodSchema<TBody>;
};

type ValidationMw = <TParams = any, TQuery = any, TBody = any>(
    {}: RequestValidation<TParams, TQuery, TBody>,
) => RouterMiddleware<string>;

export const validateRequest: ValidationMw = ({
    params,
    query,
    body,
}) => {
    return async (ctx, next) => {
        if (params) {
            params.parse(ctx.params);
        }

        if (query) {
            query.parse(ctx.request.url.searchParams);
        }

        if (body) {
            body.parse(await ctx.request.body({ type: 'json' }).value);
        }

        await next();
    };
};

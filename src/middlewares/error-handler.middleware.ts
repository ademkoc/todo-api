import { AppState, Context, ContextState, NextFn, resolveLogObject, resolveResponseObject } from '../infrastructure/index.ts';

export async function errorHandlerMw(
    ctx: Context<ContextState, AppState>,
    next: NextFn,
) {
    try {
        await next();
    } catch (error) {
        const reqId = ctx.state.reqId;

        const logObject = resolveLogObject(error, reqId);

        ctx.app.state.diContainer.cradle.logger.error(logObject);

        const responseObject = resolveResponseObject(error);

        ctx.response.status = responseObject.statusCode;
        ctx.response.body = responseObject.payload;
    }
}

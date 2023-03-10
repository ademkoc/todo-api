import { crypto } from 'std/crypto/mod.ts';

import { AppState, Context, ContextState, NextFn } from '../infrastructure/index.ts';

export async function generateRandomReqId(
    ctx: Context<ContextState, AppState>,
    next: NextFn,
) {
    const reqId = crypto.randomUUID();

    ctx.state.reqId = reqId;

    await next();

    ctx.response.headers.set('req-id', reqId);
}

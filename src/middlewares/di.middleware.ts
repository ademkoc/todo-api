import { AppState, Context, ContextState, NextFn } from '../infrastructure/index.ts';

export async function scopePerRequestMiddleware(
    ctx: Context<ContextState, AppState>,
    next: NextFn,
) {
    ctx.state.diScope = ctx.app.state.diContainer.createScope();
    await next();
}

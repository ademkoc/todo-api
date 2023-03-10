import { type Application } from 'oak';
export { type Context, type RouterContext, type RouterMiddleware } from 'oak';

import { Container, ScopeContainer } from '../ioc/index.ts';

export type OakApplication = Application<AppState>;

export type AppState = {
    diContainer: Container;
};

export type ContextState = AppState & {
    reqId: string;
    diScope: ScopeContainer;
};

export type NextFn = () => Promise<unknown>;

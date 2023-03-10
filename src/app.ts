import { Application } from 'oak';

import { getRoutes } from './modules/routes.ts';

import { AppState, Container, OakApplication, runAllHealthchecks } from './infrastructure/index.ts';
import { errorHandlerMw, generateRandomReqId, scopePerRequestMiddleware } from './middlewares/index.ts';

async function createApp(container: Container): Promise<OakApplication> {
    const app = new Application<AppState>({
        contextState: 'empty',
        state: {
            diContainer: container,
        },
    });

    const { config } = app.state.diContainer.cradle;

    // set unique request id
    app.use(generateRandomReqId);

    // set error handler
    app.use(errorHandlerMw);

    // set req based container scope
    app.use(scopePerRequestMiddleware);

    const routes = getRoutes();
    routes.forEach((router) => app.use(router.routes(), router.allowedMethods()));

    if (!config.isTest()) {
        await runAllHealthchecks(app.state.diContainer.cradle);
    }

    return app;
}

export { createApp };

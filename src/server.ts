import 'std/dotenv/load.ts';

import { createApp } from './app.ts';
import { buildContainer } from './infrastructure/index.ts';

async function startServer() {
    const container = buildContainer();

    const { config, logger } = container.cradle;

    const app = await createApp(container);

    app.addEventListener('listen', ({ hostname, port }) => {
        console.log(`Listening at port: ${hostname}:${port}`);
    });

    // setup for gracefull shutdown
    const controller = new AbortController();

    Deno.addSignalListener('SIGINT', () => {
        controller.abort();
    });

    try {
        // Listen will stop listening for requests and the promise will resolve...
        await app.listen({ port: config.app.port, signal: controller.signal });
    } catch (error) {
        logger.critical(error);
    } finally {
        // and you can do something after the close to shutdown

        // Release db connection
        await container.cradle.db.destroy();

        console.log('Bye!', Date.now());

        Deno.exit(1);
    }
}

startServer();

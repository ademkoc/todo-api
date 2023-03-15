import { asClass, asFunction, asValue, createContainer } from 'awilix';

import { getConfig } from '../config/index.ts';
import { Container, ICradle } from './ioc.types.ts';
import { DbContextFactory } from '../database/index.ts';
import { TodoRepository, TodoService } from '../../modules/todo/todo.module.ts';
import { Logger } from '../logger/index.ts';

export function buildContainer(): Container {
    const container = createContainer<ICradle>({ injectionMode: 'PROXY' });
    const config = getConfig();

    const diConfig = {
        // App Module
        config: asValue(config),
        logger: asClass(Logger).singleton(),
        db: asFunction(() => {
            return DbContextFactory.init(config);
        }, {
            lifetime: 'SINGLETON',
            dispose: (db) => {
                return db.destroy();
            },
        }),

        // Todo Module
        todoRepository: asClass(TodoRepository),
        todoService: asClass(TodoService),
    };

    container.register(diConfig);

    return container;
}

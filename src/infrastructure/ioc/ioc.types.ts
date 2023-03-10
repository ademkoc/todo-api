import type { AwilixContainer } from 'awilix';

import type { Config } from '../config/index.ts';
import type { TodoService } from '../../modules/todo/services/todo.service.ts';
import type { TodoRepository } from '../../modules/todo/repositories/todo.repository.ts';
import type { Logger } from '../logger/logger.ts';
import type { KyselyService } from '../database/index.ts';

export interface ICradle {
    config: Config;
    logger: Logger;
    db: KyselyService;
    todoService: TodoService;
    todoRepository: TodoRepository;
}

export interface IScopeCradle {}

export type Container = AwilixContainer<ICradle>;
export type ScopeContainer = AwilixContainer<ICradle & IScopeCradle>;

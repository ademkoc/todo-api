import '../../setup-tests.ts';
import { expect } from 'chai';
import { afterEach, beforeEach, describe, it } from 'std/testing/bdd.ts';
import { generateMock } from '@anatine/zod-mock';

import { buildContainer, Container } from '../../src/infrastructure/index.ts';
import { TodoService } from '../../src/modules/todo/services/todo.service.ts';
import { cleanTables, DB_MODEL } from '../utils/db-cleaner.ts';
import { CREATE_TODO_SCHEMA, UPDATE_TODO_SCHEMA } from '../../src/schemas/todo.schema.ts';
import { EntityNotFoundError } from '../../src/infrastructure/error/entity-not-found.ts';

describe('todo-service', () => {
    let diContainer: Container;
    let sut: TodoService;

    beforeEach(async () => {
        diContainer = buildContainer();
        sut = diContainer.cradle.todoService;

        await cleanTables(diContainer.cradle.db, [DB_MODEL.Todo]);
    });

    afterEach(async () => {
        await diContainer.dispose();
    });

    it('is defined', () => {
        expect(sut).to.be.not.undefined;
    });

    describe('findAllTodo', () => {
        it('Returns todos', async () => {
            const result = await sut.findAllTodo();

            expect(result.status).to.be.equals(200);
            expect(result.body)
                .to.be.an('object')
                .that.has.property('data')
                .to.be.an('array');
        });
    });

    describe('findTodoById', () => {
        it('Returns a existing todo entry', async () => {
            const createTodoDTO = generateMock(CREATE_TODO_SCHEMA);
            const createdTodo = await sut.todoRepository.createTodo(createTodoDTO);

            const result = await sut.findTodoById(createdTodo.id);

            expect(result.status).to.be.equals(200);
            expect(result.body)
                .to.be.an('object')
                .that.has.property('data')
                .to.be.an('object');
        });

        it('Throws an error for non existing todo ', async () => {
            try {
                await sut.findTodoById(0);
            } catch (error) {
                expect(error).to.be.instanceOf(EntityNotFoundError);
            }
        });
    });

    describe('findOrCreateTodo', () => {
        it('Creates todo if todo isn\'t created before', async () => {
            const createTodoDTO = generateMock(CREATE_TODO_SCHEMA);

            const result = await sut.findOrCreateTodo(createTodoDTO);

            expect(result.status).to.be.equals(201);
            expect(result.body)
                .to.be.an('object')
                .that.has.property('data')
                .to.be.an('object');
        });

        it('Returns todo if provided todo is already exists', async () => {
            const createTodoDTO = generateMock(CREATE_TODO_SCHEMA);
            await sut.todoRepository.createTodo(createTodoDTO);

            const result = await sut.findOrCreateTodo(createTodoDTO);

            expect(result.status).to.be.equals(200);
            expect(result.body)
                .to.be.an('object')
                .that.has.property('data')
                .to.be.an('object');
        });
    });

    describe('updateTodoById', () => {
        it('Updates todo and return empty response', async () => {
            const createTodoDTO = generateMock(CREATE_TODO_SCHEMA);
            const createdTodo = await sut.todoRepository.createTodo(createTodoDTO);
            const updateTodoDTO = generateMock(UPDATE_TODO_SCHEMA);

            const result = await sut.updateTodoById(createdTodo.id, updateTodoDTO);

            expect(result.status).to.be.equals(204);
            expect(result.body).to.be.undefined;
        });
    });

    describe('deleteTodoById', () => {
        it('Deletes todo and return empty response', async () => {
            const createTodoDTO = generateMock(CREATE_TODO_SCHEMA);
            const createdTodo = await sut.todoRepository.createTodo(createTodoDTO);

            const result = await sut.deleteTodoById(createdTodo.id);

            expect(result.status).to.be.equals(204);
            expect(result.body).to.be.undefined;
        });
    });
});

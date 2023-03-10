import "../../setup-tests.ts";
import { Mock } from "rhum";
import { beforeEach, describe, it } from "std/testing/bdd.ts";
import { assertEquals, assertExists } from "std/testing/asserts.ts";

import { TYPES } from "../../src/infrastructure/ioc/ioc.types.ts";
import { TodoModule } from "../../src/modules/todo/todo.module.ts";
import { AppModule } from "../../src/infrastructure/ioc/ioc.config.ts";
import { createTestingModule } from "../../src/lib/create-testing-module.ts";
import { TodoRepository } from "../../src/modules/todo/repositories/todo.repository.ts";
import { DatabaseClient } from "../../src/infrastructure/database/index.ts";
import { CreateTodo, Todo } from "../../src/schemas/todo.ts";

const mockedDbClient = Mock(DatabaseClient).create();

describe("todo-repositry", () => {
    let sut: TodoRepository;

    beforeEach(() => {
        const modules = createTestingModule(AppModule, TodoModule);

        modules.rebind(TYPES.Core.Database).toConstantValue(mockedDbClient);

        sut = modules.get(TYPES.Repository.Todo);
    });

    it("is defined", () => {
        assertExists(sut);
    });

    describe("create()", () => {
        it("creates a todo item", async () => {
            const dto: CreateTodo = { title: "Shopping List", description: "milk, bread" };
            const expectedResult = { id: 1 };

            mockedDbClient.method("queryObject")
                .willReturn({
                    command: "INSERT",
                    rowCount: 1,
                    rows: [
                        expectedResult
                    ]
                });

            const todoId = await sut.create(dto);

            assertEquals(todoId, expectedResult.id);
        });
    });

    describe("findById()", () => {
        it("find a todo by id", async () => {
            const searchId = 1;
            const expectedResult: Todo = {
                id: 1,
                title: "Shopping List",
                description: "milk, bread",
                is_completed: false,
                created_at: new Date()
            };

            mockedDbClient.method("queryObject")
                .willReturn({
                    command: "SELECT",
                    rowCount: 1,
                    rows: [
                        expectedResult
                    ]
                });

            const todo = await sut.findById(searchId);
            assertEquals(todo, expectedResult);
        });
    })
});

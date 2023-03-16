import { Either } from '../../../utils/index.ts';
import type { NewTodo, Todo, UpdateTodo } from '../../../schemas/index.ts';
import { ICradle, type KyselyService } from '../../../infrastructure/index.ts';

export class TodoRepository {
    public db: KyselyService;

    constructor(opts: ICradle) {
        this.db = opts.db;
    }

    public async findAllTodo(): Promise<Todo[]> {
        const todos = await this.db
            .selectFrom('todos')
            .select(['id', 'title', 'description', 'is_completed', 'created_at', 'updated_at'])
            .execute();

        return todos;
    }

    public async findTodoByTitle(title: string): Promise<Either<'NOT_FOUND', Todo>> {
        const todo = await this.db
            .selectFrom('todos')
            .selectAll()
            .where('title', '=', title)
            .executeTakeFirst();

        if (!todo) {
            return { error: 'NOT_FOUND' };
        }

        return { result: todo };
    }

    public async findTodoById(id: number): Promise<Either<'NOT_FOUND', Todo>> {
        const todo = await this.db
            .selectFrom('todos')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();

        if (!todo) {
            return { error: 'NOT_FOUND' };
        }

        return { result: todo };
    }

    public async createTodo(todo: NewTodo) {
        const result = await this.db
            .insertInto('todos')
            .values({
                title: todo.title,
                description: todo.description,
                is_completed: false,
            })
            .returningAll()
            .executeTakeFirst();

        return { result };
    }

    public async updateTodoById(id: number, payload: UpdateTodo) {
        const result = await this.db
            .updateTable('todos')
            .set({
                title: payload.title,
                description: payload.description,
                is_completed: payload.is_completed,
                updated_at: new Date(),
            })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();

        return { result };
    }

    public async deleteTodoById(id: number) {
        const result = await this.db
            .deleteFrom('todos')
            .where('id', '=', id)
            .returning(['id'])
            .executeTakeFirst();

        return { result };
    }
}

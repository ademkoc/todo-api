import { EntityNotFoundError, HttpResponse, ICradle } from '../../../infrastructure/index.ts';
import type { NewTodoDTO, UpdateTodoDTO } from '../../../schemas/index.ts';
import type { TodoRepository } from '../repositories/todo.repository.ts';

export class TodoService {
    public todoRepository: TodoRepository;

    constructor(opts: ICradle) {
        this.todoRepository = opts.todoRepository;
    }

    public async findAllTodo() {
        const findAllTodoResult = await this.todoRepository.findAllTodo();

        return HttpResponse.success(findAllTodoResult);
    }

    public async findTodoById(id: number) {
        const getTodoResult = await this.todoRepository.findTodoById(id);

        if (getTodoResult.error) {
            throw new EntityNotFoundError({ message: 'Todo not found', details: { id } });
        }

        return HttpResponse.success(getTodoResult.result);
    }

    public async findOrCreateTodo(todo: NewTodoDTO) {
        const findTodoResult = await this.todoRepository.findTodoByTitle(todo.title);

        if (findTodoResult.error) {
            const createTodoResult = await this.todoRepository.createTodo(todo);

            return HttpResponse.success(createTodoResult, 201);
        }

        return HttpResponse.success(findTodoResult.result);
    }

    public async updateTodoById(id: number, payload: UpdateTodoDTO) {
        await this.todoRepository.updateTodoById(id, payload);

        return HttpResponse.success(null, 204);
    }

    public async deleteTodoById(id: number) {
        await this.todoRepository.deleteTodoById(id);

        return HttpResponse.success(null, 204);
    }
}

import { NewTodo, UpdateTodo } from '../../../schemas/todo.ts';
import type { ContextState, RouterContext } from '../../../infrastructure/index.ts';

export const index = async (
    ctx: RouterContext<'/todo', never, ContextState>,
) => {
    const { todoService } = ctx.state.diScope.cradle;
    const result = await todoService.findAllTodo();

    ctx.response.status = result.status;
    ctx.response.body = result.body;
};

export const show = async (
    ctx: RouterContext<'/todo/:id', { id: string }, ContextState>,
) => {
    const id = +ctx.params.id;

    const { todoService } = ctx.state.diScope.cradle;
    const result = await todoService.findTodoById(id);

    ctx.response.status = result.status;
    ctx.response.body = result.body;
};

export const store = async (
    ctx: RouterContext<'/todo', never, ContextState>,
) => {
    const payload: NewTodo = await ctx.request.body({ type: 'json' }).value;

    const { todoService } = ctx.state.diScope.cradle;
    const result = await todoService.findOrCreateTodo(payload);

    ctx.response.status = result.status;
    ctx.response.body = result.body;
};

export const update = async (
    ctx: RouterContext<'/todo/:id', { id: string }, ContextState>,
) => {
    const id = +ctx.params.id;
    const payload: UpdateTodo = await ctx.request.body({ type: 'json' }).value;

    const { todoService } = ctx.state.diScope.cradle;
    const result = await todoService.updateTodoById(id, payload);

    ctx.response.status = result.status;
    ctx.response.body = result.body;
};

export const destroy = async (
    ctx: RouterContext<'/todo/:id', { id: string }, ContextState>,
) => {
    const id = +ctx.params.id;

    const { todoService } = ctx.state.diScope.cradle;
    const result = await todoService.deleteTodoById(id);

    ctx.response.status = result.status;
    ctx.response.body = result.body;
};

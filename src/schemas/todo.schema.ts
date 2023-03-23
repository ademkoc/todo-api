import { z } from 'zod';

export const Todo = z.object({
    id: z.number(),
    title: z.string().describe('Todo entry title'),
    description: z.string().describe('Todo entry description'),
    is_completed: z.boolean().default(false).describe('Is todo entry complated?'),
    created_at: z.date().describe('Todo entry creation date'),
    updated_at: z.date().describe('Todo entry last update date'),
});

export const CREATE_TODO_SCHEMA = z.object({
    title: z.string().min(2).describe('Todo entry title'),
    description: z.string().describe('Todo entry description'),
});

export const UPDATE_TODO_SCHEMA = z.object({
    title: z.string().describe('Todo entry title'),
    description: z.string().describe('Todo entry description'),
    is_completed: z.boolean().default(false).describe('Is todo entry complated?'),
});

export type Todo = z.infer<typeof Todo>;

export type NewTodoDTO = Omit<Todo, 'id' | 'is_completed' | 'created_at' | 'updated_at'>;

export type UpdateTodoDTO = Omit<Todo, 'id' | 'created_at' | 'updated_at'>;

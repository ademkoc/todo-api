import { ColumnType, Generated, Kysely } from 'kysely';

export type KyselyService = Kysely<Database>;

interface Todo {
    id: Generated<number>;

    title: string;
    description: string;
    is_completed: boolean;

    created_at: ColumnType<Date, string | undefined, never>;
    updated_at: ColumnType<Date, string | undefined, Date | string>;
}

export interface Database {
    todos: Todo;
}

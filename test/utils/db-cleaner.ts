import { KyselyService } from '../../src/infrastructure/index.ts';

export enum DB_MODEL {
    Todo = 'todos',
}

export async function cleanTables(db: KyselyService, modelNames: readonly DB_MODEL[]) {
    for (const name of modelNames) {
        await db.deleteFrom(name).execute();
    }
}

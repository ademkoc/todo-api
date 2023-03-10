import { Pool } from 'postgres';
import { Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler } from 'kysely';

import { Database } from './database.type.ts';
import { PostgresDriver } from './lib/postgres-driver.ts';
import { Config } from '../config/config.schema.ts';

export class DbContextFactory {
    static init(config: Config) {
        const pool = new Pool(config.db.url, config.db.poolSize, config.db.lazyPool);

        return new Kysely<Database>({
            dialect: {
                createAdapter() {
                    return new PostgresAdapter();
                },
                createDriver() {
                    return new PostgresDriver({ pool });
                },
                createIntrospector(db) {
                    return new PostgresIntrospector(db);
                },
                createQueryCompiler() {
                    return new PostgresQueryCompiler();
                },
            },
        });
    }
}

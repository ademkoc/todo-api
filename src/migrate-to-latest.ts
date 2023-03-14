import 'std/dotenv/load.ts';
import * as path from 'std/path/mod.ts';
import { Migrator } from 'kysely';

import { FileMigrationProvider } from './infrastructure/database/lib/file-migration-provider.ts';
import { DbContextFactory, getConfig } from './infrastructure/index.ts';

async function migrateToLatest() {
    const config = getConfig();

    const db = DbContextFactory.init(config);

    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs: {
                readdir: async (path) => {
                    const dirs = [];
                    for await (const dirEntry of Deno.readDir(path)) {
                        dirs.push(dirEntry.name);
                    }
                    return dirs;
                },
            },
            path,
            migrationFolder: path.fromFileUrl(path.join(import.meta.url, '..', '..', 'db', 'migrations')),
        }),
    });

    const { error, results } = await migrator.migrateToLatest();

    results?.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        } else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });

    if (error) {
        console.error('failed to migrate');
        console.error(error);
        Deno.exit(1);
    }

    await db.destroy();
}

migrateToLatest();

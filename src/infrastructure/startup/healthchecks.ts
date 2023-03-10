import { sql } from 'kysely';
import { ICradle } from '../ioc/index.ts';
import { InternalError } from '../error/index.ts';
import { KyselyService } from '../database/index.ts';
import { executeAsyncAndHandleGlobalErrors } from '../utils/execute.ts';

const HEALTHCHECK_ERROR_CODE = 'HEALTHCHECK_ERROR';

export async function testDbHealth(db: KyselyService) {
    const response = await sql`SELECT 1`.execute(db);

    if (!response) {
        throw new InternalError({
            message: 'Database did not respond correctly',
            errorCode: HEALTHCHECK_ERROR_CODE,
        });
    }
}

export async function runAllHealthchecks(dependencies: ICradle) {
    return executeAsyncAndHandleGlobalErrors(
        () => Promise.all([testDbHealth(dependencies.db)]),
        true,
    );
}

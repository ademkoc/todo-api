import { Pool, PoolClient } from 'postgres';
import { CompiledQuery, DatabaseConnection, Driver, QueryResult, TransactionSettings } from 'kysely';

type PostgresDialectConfig = { pool: Pool };

const PRIVATE_RELEASE_METHOD = Symbol();

export class PostgresDriver implements Driver {
    readonly #config: PostgresDialectConfig;
    readonly #connections = new WeakMap<PoolClient, DatabaseConnection>();
    #pool?: Pool;

    constructor(config: PostgresDialectConfig) {
        this.#config = config;
    }

    async init(): Promise<void> {
        this.#pool = this.#config.pool;
    }

    async acquireConnection(): Promise<DatabaseConnection> {
        const client = await this.#pool!.connect();
        let connection = this.#connections.get(client);

        if (!connection) {
            connection = new PostgresConnection(client);
            this.#connections.set(client, connection);
        }

        return connection;
    }

    async beginTransaction(
        connection: DatabaseConnection,
        settings: TransactionSettings,
    ): Promise<void> {
        if (settings.isolationLevel) {
            await connection.executeQuery(
                CompiledQuery.raw(
                    `start transaction isolation level ${settings.isolationLevel}`,
                ),
            );
        } else {
            await connection.executeQuery(CompiledQuery.raw('begin'));
        }
    }

    async commitTransaction(connection: DatabaseConnection): Promise<void> {
        await connection.executeQuery(CompiledQuery.raw('commit'));
    }

    async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
        await connection.executeQuery(CompiledQuery.raw('rollback'));
    }

    async releaseConnection(connection: PostgresConnection): Promise<void> {
        connection[PRIVATE_RELEASE_METHOD]();
    }

    async destroy(): Promise<void> {
        if (this.#pool) {
            const pool = this.#pool;
            this.#pool = undefined;
            await pool.end();
        }
    }
}

class PostgresConnection implements DatabaseConnection {
    #client: PoolClient;

    constructor(client: PoolClient) {
        this.#client = client;
    }
    streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
        throw new Error('Method not implemented.');
    }

    async executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
        try {
            const result = await this.#client.queryObject<O>(compiledQuery.sql, [
                ...compiledQuery.parameters,
            ]);

            if (
                (result.command === 'INSERT' ||
                    result.command === 'UPDATE' ||
                    result.command === 'DELETE') && result.rowCount
            ) {
                const numAffectedRows = BigInt(result.rowCount);

                return {
                    numAffectedRows,
                    rows: result.rows ?? [],
                };
            }

            return {
                rows: result.rows ?? [],
            };
        } catch (err) {
            throw err;
        }
    }

    [PRIVATE_RELEASE_METHOD](): void {
        this.#client.release();
    }
}

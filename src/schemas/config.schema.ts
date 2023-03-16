import { z } from 'zod';

export const AppConfig = z.object({
    PORT: z.coerce.number().default(8080),
    BIND_ADDRESS: z.string().default('0.0.0.0'),
    NODE_ENV: z.string().default('development'),
});

export const DatabaseConfig = z.object({
    DB_URL: z.string().optional(),
    POOLSIZE: z.coerce.number(),
    LAZYPOOL: z.coerce.boolean().default(false),
});

/**
 * If the two schemas share keys, the properties of B overrides the property of A.
 * The returned schema also inherits the "unknownKeys" policy (strip/strict/passthrough) and the catchall schema of B.
 */
export const Config = AppConfig.merge(DatabaseConfig).transform((
    input,
) => ({
    app: {
        port: input.PORT,
        bindAddress: input.BIND_ADDRESS,
    },
    db: {
        url: input.DB_URL,
        poolSize: input.POOLSIZE,
        lazyPool: input.LAZYPOOL,
    },
    isProduction() {
        return input.NODE_ENV === 'production';
    },
    isDevelopment() {
        return input.NODE_ENV !== 'production';
    },
    isTest() {
        return input.NODE_ENV === 'test';
    },
}));

export type AppConfig = z.infer<typeof AppConfig>;
export type DatabaseConfig = z.infer<typeof DatabaseConfig>;
export type Config = z.infer<typeof Config>;

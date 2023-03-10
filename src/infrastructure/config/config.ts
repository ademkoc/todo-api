import { Config } from './config.schema.ts';

export function getConfig() {
    const parseResult = Config.safeParse(Deno.env.toObject());

    if (!parseResult.success) {
        throw new Error(
            `Validation Error: ${JSON.stringify(parseResult.error.issues)}`,
        );
    }

    return parseResult.data;
}

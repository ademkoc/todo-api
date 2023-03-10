import { Config } from '../../schemas/index.ts';

export function getConfig() {
    const parseResult = Config.safeParse(Deno.env.toObject());

    if (!parseResult.success) {
        throw new Error(
            `Validation Error: ${JSON.stringify(parseResult.error.issues)}`,
        );
    }

    return parseResult.data;
}

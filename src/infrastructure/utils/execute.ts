export function executeAndHandleGlobalErrors<T>(operation: () => T) {
    try {
        const result = operation();
        return result;
    } catch (err) {
        // const logObject = resolveGlobalErrorLogObject(err);
        // globalLogger.error(logObject);
        console.error(err);
        Deno.exit(1);
    }
}

export async function executeAsyncAndHandleGlobalErrors<T>(
    operation: () => Promise<T>,
    stopOnError = true,
) {
    try {
        const result = await operation();
        return result;
    } catch (err) {
        // const logObject = resolveGlobalErrorLogObject(err);
        // globalLogger.error(logObject);
        console.error(err);
        if (stopOnError) {
            Deno.exit(1);
        }
    }
}

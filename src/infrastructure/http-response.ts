export class HttpResponse {
    public constructor(
        public readonly body: any,
        public readonly status: number,
    ) {}

    public static success(data: any, status = 200) {
        if (status === 204) {
            return new HttpResponse(undefined, 204);
        }
        return new HttpResponse({ data }, status);
    }
}

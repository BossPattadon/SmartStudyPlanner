type RequestOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
};

export async function api<T>(path: string, option: RequestOptions = {}): Promise<T> {
    const {method = 'GET', body} = option;
    
    const headers: Record<string, string> = {};
    if (body != undefined) {
        headers['Content-Type'] = 'application/json';
    };

    const res = await fetch(`/api${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: res.statusText }))
        throw new Error(error.error ?? 'Request failed');
    };

    return res.json() as Promise<T>;
};
import { cookies } from 'next/dist/server/request/cookies';
import { ResponseIF } from '@/types/api';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';

export const fetchApiEnvelope = async <DataIF = null>(
    route: string,
    cache: RequestCache = 'no-cache',
): Promise<ResponseIF<DataIF> | null> => {
    let token: string | null = null;

    try {
        const cookieStore = await cookies();
        token = cookieStore.get(STORAGE_KEYS.Token)?.value || null;
    } catch {
        token = null;
    }

    try {
        console.log(
            'fetch route:',
            `${process.env.NEXT_PUBLIC_REST_DOMAIN_URL}${process.env.NEXT_PUBLIC_REST_BASE}${route}`,
        );
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_REST_DOMAIN_URL}${process.env.NEXT_PUBLIC_REST_BASE}${route}`,
            {
                cache,
                ...(token
                    ? {
                          credentials: 'include',
                          headers: {
                              Authorization: `Bearer ${token}`,
                          },
                      }
                    : {}),
            },
        );

        return (await response.json()) as ResponseIF<DataIF>;
    } catch (error) {
        console.error('error', error);

        return null;
    }
};

export const fetchApi = async <DataIF = null>(
    route: string,
    cache: RequestCache = 'no-cache', //'force-cache'
): Promise<DataIF | null | undefined> => {
    const envelope = await fetchApiEnvelope<DataIF>(route, cache);

    if (!envelope) {
        return;
    }

    return envelope.result === 'ok' ? envelope.data : null;
};

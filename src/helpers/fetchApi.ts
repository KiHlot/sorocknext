import { cookies } from 'next/dist/server/request/cookies';
import { ResponseIF } from '@/types/api';

export const fetchApi = async <DataIF = null>(
    route: string,
    cache: RequestCache = 'no-cache', //'force-cache'
): Promise<DataIF | null | undefined> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null;

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

        const { result, data }: ResponseIF<DataIF> = await response.json();

        return result === 'ok' ? data : null;
    } catch (error) {
        console.error('error', error);
    }
};

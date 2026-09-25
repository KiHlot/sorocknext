import { PostIF } from '@/types/post';
import { FetchPostParamsIF } from '@/api/post/types';
import { fetchApi } from '@/helpers/fetchApi';

export const fetchPost = async ({
    postType,
    slug,
}: FetchPostParamsIF): Promise<PostIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<PostIF>(
        `/post/${encodeURIComponent(slug)}?${searchParams.toString()}`,
    );
};

import { PostIF } from '@/types/post';
import {
    FetchArchiveIF,
    FetchArchiveParamsIF,
    FetchArchivePostParamsIF,
} from '@/api/archive/types';
import { SeoDataIF } from '@/api/metadata/types';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import { Metadata } from '@/helpers/getMetadata/getMetadata.types';

export const fetchArchive = async ({
    postType,
    page,
}: FetchArchiveParamsIF): Promise<FetchArchiveIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);
    searchParams.append('page', String(page));

    return fetchApi<FetchArchiveIF>(
        `/archive/archive?${searchParams.toString()}`,
    );
};

export const fetchArchiveSlugs = async (
    postType: string,
): Promise<string[] | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<string[]>(`/archive/get-slugs?${searchParams.toString()}`);
};

export const fetchArchivePostMetadata = async ({
    postType,
    slug,
}: FetchArchivePostParamsIF): Promise<Metadata> => {
    const searchParams = new URLSearchParams();

    searchParams.append('slug', slug);

    const data = await fetchApi<SeoDataIF>(
        `/archive/metadata/${postType}?${searchParams.toString()}`,
    );

    return getMetadata(data);
};

export const fetchArchivePost = async ({
    postType,
    slug,
}: FetchArchivePostParamsIF): Promise<PostIF | null | undefined> => {
    const searchParams = new URLSearchParams();

    searchParams.append('postType', postType);

    return fetchApi<PostIF>(`/archive/${slug}?${searchParams.toString()}`);
};

import { MetadataParamsIF, SeoDataIF } from '@/api/metadata/types';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import { Metadata } from '@/helpers/getMetadata/getMetadata.types';

export const fetchMetadata = async (
    params: MetadataParamsIF,
): Promise<Metadata> => {
    const searchParams = new URLSearchParams();

    searchParams.set('type', params.type);

    if (params.slug) {
        searchParams.set('slug', params.slug);
    }

    if (params.param) {
        searchParams.set('param', params.param);
    }

    const data = await fetchApi<SeoDataIF>(
        `/metadata?${searchParams.toString()}`,
    );

    return getMetadata(data);
};

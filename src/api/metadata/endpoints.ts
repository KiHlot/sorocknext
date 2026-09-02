import { FetchMetadataIF, SeoDataIF } from '@/api/metadata/types';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import { Metadata } from '@/helpers/getMetadata/getMetadata.types';

export const fetchMetadata = async ({
    type,
    route,
    param,
}: FetchMetadataIF): Promise<Metadata> => {
    const data = await fetchApi<SeoDataIF>(
        `/metadata/${type}/${route}${param ? `/?param=${param}` : ''}`,
    );

    return getMetadata(data);
};

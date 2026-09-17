import { ValueOfT } from '@/types/common';

export const METADATA_TYPE = {
    Page: 'page',
    Archive: 'archive',
    Post: 'post',
    Search: 'search',
} as const;

export type MetadataTypeT = ValueOfT<typeof METADATA_TYPE>;

export interface MetadataParamsIF {
    type: MetadataTypeT;
    slug?: string;
    param?: string;
}

export interface SeoDataIF {
    title: string;
    description: string;
    canonical: string;
    innerImg?: string;
    dateGmt: string;
    modifiedGmt: string;
    author: string;
    tags?: string[];
}

import { PaginationInfoIF } from '@/types/common';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface FetchArchiveParamsIF {
    postType: string;
    page: number;
}

export interface FetchArchiveIF {
    postsData: PostArchiveCardModelIF[] | null;
    paginationInfo: PaginationInfoIF;
}

export interface FetchArchivePostParamsIF {
    postType: string;
    slug: string;
}

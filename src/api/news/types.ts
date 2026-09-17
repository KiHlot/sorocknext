import { PaginationIF } from '@/types/common';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export type FetchNewsArchiveParamsIF = PaginationIF;

export interface FetchNewsArchiveIF {
    postsData: PostArchiveCardModelIF[] | null;
}

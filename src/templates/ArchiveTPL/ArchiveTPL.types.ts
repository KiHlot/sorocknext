import { PaginationInfoIF } from '@/types/common';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface ArchiveTPLPropsIF {
    pathname: string;
    title: string;
    postsData?: PostArchiveCardModelIF[] | null;
    paginationInfo?: PaginationInfoIF | null;
}

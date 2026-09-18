import { PaginationInfoIF } from '@/types/common';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';
import { ArchiveSeoDataIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

export interface ArchiveTPLPropsIF {
    pathname: string;
    title: string;
    postsData?: PostArchiveCardModelIF[] | null;
    paginationInfo?: PaginationInfoIF | null;
    seoData?: ArchiveSeoDataIF | null;
    archivePromoData?: PostArchiveCardModelIF[] | null;
}

import { PaginationInfoIF } from '@/types/common';
import { TaxonomyTermCountIF } from '@/types/post';
import { PostTypeT } from '@/configs/postTypes.config';
import { EventCardModelIF } from '@/components/cards/EventCard/EventCard.types';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';
import { ArchiveTermFilterPropsIF } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.types';
import { ArchiveSeoDataIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

export interface ArchiveTPLPropsIF {
    pathname: string;
    title: string;
    postType?: PostTypeT;
    postsData?: PostArchiveCardModelIF[] | null;
    paginationInfo?: PaginationInfoIF | null;
    seoData?: ArchiveSeoDataIF | null;
    archivePromoData?: PostArchiveCardModelIF[] | null;
    termFilter?: ArchiveTermFilterPropsIF | null;
    taxonomyTerms?: TaxonomyTermCountIF[] | null;
    todayRockDates?: EventCardModelIF[] | null;
    getPageHref?: (page: number) => string;
}

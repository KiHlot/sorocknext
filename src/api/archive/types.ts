import { PaginationInfoIF } from '@/types/common';
import { EventCardModelIF } from '@/components/cards/EventCard/EventCard.types';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { ArchiveSeoDataIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

export interface FetchArchiveParamsIF {
    postType: string;
    page: number;
    taxonomy?: string;
}

export interface FetchArchiveIF {
    postsData: PostArchiveCardModelIF[] | null;
    paginationInfo: PaginationInfoIF;
}

export interface FetchArchivePromoParamsIF {
    postType: string;
}

export interface FetchArchivePromoIF {
    seoData: ArchiveSeoDataIF | null;
    archivePromoData: PostArchiveCardModelIF[] | null;
}

export interface FetchCalendarParamsIF {
    month: number;
    day: number;
}

export type FetchCalendarIF = EventCardModelIF[] | null;

export interface FetchRockCalendarParamsIF {
    month: number;
}

export type FetchRockCalendarIF = Record<string, PostShortCardModelIF[]> | null;

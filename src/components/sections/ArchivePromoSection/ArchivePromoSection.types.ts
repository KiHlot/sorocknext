import { HTMLString } from '@/types/common';
import { PostTypeT } from '@/configs/postTypes.config';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface ArchiveSeoDataIF {
    titleH1: HTMLString;
    description: HTMLString;
    reviewUrl: string;
}

export interface ArchivePromoSectionPropsIF {
    pathname: string;
    title: string;
    titleId: string;
    seoData?: ArchiveSeoDataIF | null;
    archivePromoData?: PostArchiveCardModelIF[] | null;
    postType?: PostTypeT;
}

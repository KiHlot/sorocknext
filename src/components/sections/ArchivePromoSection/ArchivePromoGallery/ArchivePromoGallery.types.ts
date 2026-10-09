import { PostTypeT } from '@/configs/postTypes.config';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface ArchivePromoGalleryPropsIF {
    archivePromoData: PostArchiveCardModelIF[];
    postType: PostTypeT;
    className?: string;
}

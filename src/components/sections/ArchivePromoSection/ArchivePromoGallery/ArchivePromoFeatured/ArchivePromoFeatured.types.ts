import { PostTypeT } from '@/configs/postTypes.config';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface ArchivePromoFeaturedPropsIF {
    postData: PostArchiveCardModelIF;
    postType: PostTypeT;
    className?: string;
}

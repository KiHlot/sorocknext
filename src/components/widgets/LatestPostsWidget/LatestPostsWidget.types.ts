import { PostTypeT } from '@/configs/postTypes.config';
import { LatestPostCardModelIF } from '@/components/cards/LatestPostCard/LatestPostCard.types';

export interface LatestPostsWidgetPropsIF {
    items: LatestPostCardModelIF[];
    postType: PostTypeT;
}

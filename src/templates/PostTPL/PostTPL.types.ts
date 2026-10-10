import { PostIF } from '@/types/post';
import { PostTypeT } from '@/configs/postTypes.config';
import { PostArchiveCardModelIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

export interface PostTPLPropsIF {
    data: PostIF;
    latestPosts: PostArchiveCardModelIF[] | null;
    pathname: string;
    postType: PostTypeT;
}

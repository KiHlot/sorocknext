import { DateT } from '@/types/common';
import { PostTypeT } from '@/configs/postTypes.config';

export interface LatestPostCardModelIF {
    coverImg: string | null;
    postDate: DateT;
    taxonomies: string[] | null;
    titleH1: string;
    url: string;
}

export interface LatestPostCardPropsIF {
    className?: string;
    postData: LatestPostCardModelIF;
    postType: PostTypeT;
}

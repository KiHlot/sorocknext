import { PostIF } from '@/types/post';
import { PostTypeT } from '@/configs/postTypes.config';

export interface PostTPLPropsIF {
    data: PostIF;
    pathname: string;
    postType: PostTypeT;
}

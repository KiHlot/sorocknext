import { PostTypeT } from '@/configs/postTypes.config';

export interface TermLinkPropsIF {
    postType: PostTypeT;
    termSlug: string;
    linkType?: 'simple' | 'text';
    className?: string;
    size?: 'default' | 'large';
}

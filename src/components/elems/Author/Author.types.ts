import { AuthorThumbIF } from '@/types/post';

export interface AuthorPropsIF {
    className?: string;
    data?: AuthorThumbIF;
    type?: 'full' | 'name' | 'thumb';
}

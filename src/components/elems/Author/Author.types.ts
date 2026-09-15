import { AuthorIF } from '@/types/post';

export interface AuthorPropsIF {
    className?: string;
    data?: AuthorIF;
    type?: 'full' | 'name' | 'thumb';
}

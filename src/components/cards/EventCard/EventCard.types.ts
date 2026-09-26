import { AuthorIF } from '@/types/post';

export interface EventCardModelIF {
    titleH1: string;
    content: string;
    author: AuthorIF;
    url: string;
    coverImg: string | null;
    tags: string[] | null;
    country: string;
}

export interface EventCardPropsIF {
    data?: EventCardModelIF[] | null;
    className?: string;
}

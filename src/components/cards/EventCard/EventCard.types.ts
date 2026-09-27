import { DateT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface EventCardModelIF {
    titleH1: string;
    content: string;
    author: AuthorIF;
    url: string;
    coverImg: string | null;
    tags: string[] | null;
    country: string;
    eventDate: DateT;
}

export interface EventCardPropsIF {
    data?: EventCardModelIF[] | null;
    className?: string;
}

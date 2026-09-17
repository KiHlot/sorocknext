import { DateT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface PostArchiveCardModelIF {
    titleH1: string;
    content: string;
    author: AuthorIF;
    url: string;
    coverImg: string | null;
    postDate: DateT;
    tags: string[] | null;
    country: string;
    categories: string[] | null;
    readingTime: number;
}

export interface PostArchiveCardPropsIF {
    className?: string;
    postData: PostArchiveCardModelIF;
}

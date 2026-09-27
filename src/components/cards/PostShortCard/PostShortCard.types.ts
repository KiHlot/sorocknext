import { DateT, DateWithTimeT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface PostShortCardModelIF {
    thumbnail: string;
    title: string;
    url: string;
    author: AuthorIF;
    categories: string[] | null;
    postDate: DateWithTimeT;
    eventDate: DateT;
    year: string;
}

export interface PostShortCardPropsIF {
    postData: PostShortCardModelIF;
    className?: string;
}

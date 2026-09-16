import { DateWithTimeT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface PostShortCardModelIF {
    thumbnail: string;
    title: string;
    url: string;
    author: AuthorIF;
    categories: string[] | null;
    publishDate: DateWithTimeT;
    year: string;
}

export interface PostShortCardPropsIF {
    thumbData: PostShortCardModelIF;
    className?: string;
}

import { AuthorThumbIF } from '@/types/post';

export interface TagSearchIF {
    thumbnail: string;
    title: string;
    url: string;
    author: AuthorThumbIF;
    publishDate: string;
    categories: string[] | null;
    postDateNumber: number;
    year: number;
}

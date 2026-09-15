import { AuthorIF } from '@/types/post';

export interface TagSearchIF {
    thumbnail: string;
    title: string;
    url: string;
    author: AuthorIF;
    publishDate: string;
    categories: string[] | null;
    postDateNumber: number;
    year: number;
}

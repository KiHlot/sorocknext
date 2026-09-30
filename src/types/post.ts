import { HTMLString, LinkIF, OptionIF } from '@/types/common';

export interface PostArchiveIF {
    defaultData: LinkIF[];
}

export interface AuthorIF {
    img80?: string | null;
    fullName: string;
    url?: string;
}

export interface VideoInfoIF {
    title: string;
    artists: string[] | null;
    year: number | null;
    coverImg: string;
}

export interface VideoIF {
    videoCode: string;
    videoInfo: VideoInfoIF;
}

export interface AlbumInfoIF {
    title: string;
    artists: string[] | null;
    year: number | null;
    coverImg: string;
}

export interface MusicIF {
    musicCode: string;
    albumInfo: AlbumInfoIF;
}

export interface PostBaseIF {
    author: AuthorIF;
    innerImg: string | null;
    country: string;
    settings: {
        readingTime: number;
    };
    main: {
        titleH1: string;
        titleSeo: string;
        postDate: string;
        content: HTMLString;
    };
    taxonomies: {
        tags: OptionIF[] | null;
        categories: string[] | null;
    };
    video: VideoIF[] | null;
    music: MusicIF | null;
}

export interface PostIF {
    postBase: PostBaseIF;
}

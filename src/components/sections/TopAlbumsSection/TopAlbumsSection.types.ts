export interface TopAlbumIF {
    position: number;
    musicCode: string;
    title: string;
    artists: string[] | null;
    year: number | null;
    country: string | null;
    coverImg: string;
    innerImg: string | null;
    url: string | null;
}

export interface TopAlbumsListIF {
    title: string;
    tabTitle: string;
    albums: TopAlbumIF[];
}

export interface TopAlbumsSectionPropsIF {
    data: TopAlbumsListIF[];
}

export interface TopAlbomIF {
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

export interface TopAlbomsListIF {
    title: string;
    tabTitle: string;
    alboms: TopAlbomIF[];
}

export interface TopAlbomsSectionPropsIF {
    data: TopAlbomsListIF[];
}

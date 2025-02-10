export interface AuthorIF {
    img80: string | null;
    fullName: string;
    url: string;
}

export interface AuthorPropsIF {
    className?: string;
    data?: AuthorIF;
    type?: 'full' | 'name' | 'thumb';
}

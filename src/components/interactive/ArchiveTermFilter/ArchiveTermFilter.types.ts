export interface ArchiveTermFilterItemIF {
    slug: string;
    label: string;
    href: string;
}

export interface ArchiveTermFilterPropsIF {
    items: ArchiveTermFilterItemIF[];
    activeSlug?: string;
}

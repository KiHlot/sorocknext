export interface TaxonomyTermLinkIF {
    slug: string;
    label: string;
    count: number;
    href: string;
}

export interface TaxonomyTermsWidgetPropsIF {
    title: string;
    items: TaxonomyTermLinkIF[];
}

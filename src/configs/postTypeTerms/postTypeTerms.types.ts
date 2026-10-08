import { ReactElement } from 'react';
import { LinkIF } from '@/types/common';
import { CUSTOM_TAXONOMIES } from '@/configs/taxonomies.config';

export interface PostTypeTermConfigIF {
    link: LinkIF;
    icon: ReactElement;
}

type TermsConfigT<T extends Record<string, string>> = Record<
    keyof T,
    PostTypeTermConfigIF
>;

export interface PostTypeTermsConfigIF {
    article: TermsConfigT<typeof CUSTOM_TAXONOMIES.article_cat.terms>;
    music: TermsConfigT<typeof CUSTOM_TAXONOMIES.music_cat.terms>;
    news: TermsConfigT<typeof CUSTOM_TAXONOMIES.news_cat.terms>;
    video: TermsConfigT<typeof CUSTOM_TAXONOMIES.video_cat.terms>;
}

import { OptionIF } from '@/types/common';
import { AuthorThumbIF } from '@/types/post';

export interface SearchConfigIF {
    postTypes: OptionIF[];
    categories: OptionIF[];
}

export interface SearchedPageIF {
    pageData: {
        pageId: number;
        thumb: string | null;
        title: string;
        country: string;
        url: string;
        dateUi: string;
    };
    authorData: AuthorThumbIF;
}

export interface SearchResultIF {
    searchedPages: SearchedPageIF[] | null;
    searchResultMaxCount: number;
}

export interface SearchTPLPropsIF {
    searchConfig?: SearchConfigIF | null;
    searchResult?: SearchResultIF;
}

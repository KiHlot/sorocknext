import { SearchParamsT } from '@/types/common';
import { AuthorIF } from '@/types/post';
import { SearchConfigIF } from '@/components/widgets/SearchWidget/SearchWidget.types';

export interface SearchedPageIF {
    pageData: {
        pageId: number;
        thumb: string | null;
        title: string;
        country: string;
        url: string;
        dateUi: string;
    };
    authorData: AuthorIF;
}

export interface SearchResultIF {
    searchedPages: SearchedPageIF[] | null;
    searchResultMaxCount: number;
}

export interface SearchTPLPropsIF {
    searchConfig?: SearchConfigIF | null;
    searchResult?: SearchResultIF;
    queryParams?: SearchParamsT;
}

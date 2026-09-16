import { SearchParamsT } from '@/types/common';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { SearchConfigIF } from '@/components/widgets/SearchWidget/SearchWidget.types';

export interface SearchResultIF {
    searchedPages: PostShortCardModelIF[] | null;
    searchResultMaxCount: number;
}

export interface SearchTPLPropsIF {
    searchConfig?: SearchConfigIF | null;
    searchResult?: SearchResultIF;
    queryParams?: SearchParamsT;
}

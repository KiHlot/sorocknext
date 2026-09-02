import { SearchConfigIF } from '@/components/widgets/SearchWidget/SearchWidget.types';
import { SearchResultIF } from '@/templates/SearchTPL/SearchTPL.types';

export interface FetchSearchDataIF {
    searchResult: SearchResultIF;
}

export interface FetchSearchConfigIF {
    searchConfig: SearchConfigIF;
}

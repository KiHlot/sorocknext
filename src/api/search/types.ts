import {
    SearchConfigIF,
    SearchResultIF,
} from '@/templates/SearchTPL/SearchTPL.types';

export interface FetchSearchDataIF {
    searchResult: SearchResultIF;
}

export interface FetchSearchConfigIF {
    searchConfig: SearchConfigIF;
}

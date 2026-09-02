import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import { SearchTPLPropsIF } from '@/templates/SearchTPL/SearchTPL.types';

const SearchTPL: FC<SearchTPLPropsIF> = ({ searchConfig, searchResult }) => (
    <CommonLayout>
        <Content>
            <>
                {searchResult?.searchedPages?.map((result) => (
                    <div key={result.pageData.pageId}>
                        {result.pageData.title}
                    </div>
                ))}
            </>
        </Content>
        <Sidebar>{searchConfig?.categories.join(',')}</Sidebar>
    </CommonLayout>
);

export default SearchTPL;

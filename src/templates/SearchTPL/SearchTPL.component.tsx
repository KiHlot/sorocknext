import { FC } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import SearchWidget from '@/components/widgets/SearchWidget/SearchWidget.component';
import styles from '@/templates/SearchTPL/SearchTPL.module.scss';
import { SearchTPLPropsIF } from '@/templates/SearchTPL/SearchTPL.types';

const SearchTPL: FC<SearchTPLPropsIF> = ({
    searchConfig,
    searchResult,
    queryParams,
}) => (
    <CommonLayout>
        <Content className={styles.contentWrapper}>
            {searchResult?.searchedPages?.map((result) => (
                <div key={result.pageData.pageId}>{result.pageData.title}</div>
            ))}
        </Content>
        <Sidebar>
            {searchConfig && (
                <SearchWidget
                    searchConfig={searchConfig}
                    queryParams={queryParams}
                />
            )}
        </Sidebar>
    </CommonLayout>
);

export default SearchTPL;

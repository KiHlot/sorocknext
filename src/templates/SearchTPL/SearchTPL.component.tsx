import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostShortCard from '@/components/cards/PostShortCard/PostShortCard.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import SearchWidget from '@/components/widgets/SearchWidget/SearchWidget.component';
import styles from '@/templates/SearchTPL/SearchTPL.module.scss';
import { SearchTPLPropsIF } from '@/templates/SearchTPL/SearchTPL.types';

const SearchTPL: FC<SearchTPLPropsIF> = ({
    searchConfig,
    searchedPages,
    queryParams,
}) => {
    const searchedPagesLength = searchedPages?.length || 0;
    const maxCount = searchConfig?.searchResultMaxCount;
    const phrase = queryParams?.phrase;

    return (
        <>
            <Content className={`flcol gapLayout ${styles.contentWrapper}`}>
                {phrase && (
                    <h1 className={styles.label}>
                        Результат поиска по запросу: {phrase}
                    </h1>
                )}

                {searchedPagesLength ? (
                    <div className={styles.resultsList}>
                        {searchedPages?.map((postData) => (
                            <PostShortCard
                                postData={postData}
                                key={postData.url}
                                className={styles.card}
                            />
                        ))}
                        {maxCount && searchedPagesLength >= maxCount && (
                            <InfoBlock
                                variant="outlined"
                                className={styles.infoBlock}
                            >
                                Мы показали ближайшие результаты,
                                соответствующие вашему запросу
                                <br />
                                Уточните запрос для более точного поиска
                            </InfoBlock>
                        )}
                    </div>
                ) : (
                    <InfoBlock variant="outlined">
                        По вашему запросу результатов не найдено
                        <br />
                        Уточните запрос для более точного поиска
                    </InfoBlock>
                )}
            </Content>
            <Sidebar>
                {searchConfig && (
                    <SearchWidget
                        searchConfig={searchConfig}
                        queryParams={queryParams}
                    />
                )}
            </Sidebar>
        </>
    );
};

export default SearchTPL;

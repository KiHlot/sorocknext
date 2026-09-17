import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostArchiveCard from '@/components/cards/PostArchiveCard/PostArchiveCard.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import styles from '@/templates/NewsArchiveTPL/NewsArchiveTPL.module.scss';
import { NewsArchiveTPLPropsIF } from '@/templates/NewsArchiveTPL/NewsArchiveTPL.types';

const NewsArchiveTPL: FC<NewsArchiveTPLPropsIF> = ({ data }) => (
    <>
        <Content>
            <Breadcrumbs />
            <section className={styles.archive} aria-labelledby="news-title">
                <h1 id="news-title" className={styles.title}>
                    Новости
                </h1>
                {!!data?.postsData?.length && (
                    <div className={styles.list}>
                        {data.postsData.map((postData) => (
                            <PostArchiveCard
                                key={postData.url}
                                postData={postData}
                                className={styles.card}
                            />
                        ))}
                    </div>
                )}
            </section>
        </Content>
        <Sidebar>sidebar</Sidebar>
    </>
);

export default NewsArchiveTPL;

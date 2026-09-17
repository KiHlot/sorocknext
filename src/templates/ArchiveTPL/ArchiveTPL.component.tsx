import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import PostArchiveCard from '@/components/cards/PostArchiveCard/PostArchiveCard.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import Pagination from '@/components/interactive/Pagination/Pagination.component';
import styles from '@/templates/ArchiveTPL/ArchiveTPL.module.scss';
import { ArchiveTPLPropsIF } from '@/templates/ArchiveTPL/ArchiveTPL.types';

const ArchiveTPL: FC<ArchiveTPLPropsIF> = ({
    pathname,
    title,
    postsData,
    paginationInfo,
}) => {
    const titleId = `${pathname.replaceAll('/', '') || 'archive'}-title`;

    return (
        <>
            <Content>
                <Breadcrumbs pathname={pathname} />
                <section className={styles.archive} aria-labelledby={titleId}>
                    <h1 id={titleId} className={styles.title}>
                        {title}
                    </h1>
                    {!!postsData?.length && (
                        <div className={styles.list}>
                            {postsData.map((postData) => (
                                <PostArchiveCard
                                    key={postData.url}
                                    postData={postData}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    )}
                    <Pagination
                        pagination={
                            paginationInfo
                                ? {
                                      page: paginationInfo.currentPage,
                                      pagesCount: paginationInfo.pagesCount,
                                  }
                                : null
                        }
                    />
                </section>
            </Content>
            <Sidebar>sidebar</Sidebar>
        </>
    );
};

export default ArchiveTPL;

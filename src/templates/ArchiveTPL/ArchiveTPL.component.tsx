import { FC } from 'react';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Section from '@/components/blocks/Section/Section.component';
import PostArchiveCard from '@/components/cards/PostArchiveCard/PostArchiveCard.component';
import ArchiveTermFilter from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import Pagination from '@/components/interactive/Pagination/Pagination.component';
import { ROCK_DATA_ARCHIVE_PATH } from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.config';
import ArchivePromoSection from '@/components/sections/ArchivePromoSection/ArchivePromoSection.component';
import styles from '@/templates/ArchiveTPL/ArchiveTPL.module.scss';
import { ArchiveTPLPropsIF } from '@/templates/ArchiveTPL/ArchiveTPL.types';

const ArchiveTPL: FC<ArchiveTPLPropsIF> = ({
    pathname,
    title,
    postType,
    postsData,
    paginationInfo,
    seoData = null,
    archivePromoData = null,
    termFilter = null,
    getPageHref,
}) => {
    const titleId = `${pathname.replaceAll('/', '') || 'archive'}-title`;
    const hasPromo =
        !!seoData ||
        !!archivePromoData?.length ||
        pathname === ROCK_DATA_ARCHIVE_PATH;

    return (
        <>
            <Content>
                {hasPromo ? (
                    <ArchivePromoSection
                        pathname={pathname}
                        title={title}
                        titleId={titleId}
                        seoData={seoData}
                        archivePromoData={archivePromoData}
                        postType={postType}
                    />
                ) : (
                    <Breadcrumbs pathname={pathname} title={title} />
                )}
                <Section
                    className={styles.archive}
                    ariaLabelledBy={hasPromo ? undefined : titleId}
                    ariaLabel={hasPromo ? 'Материалы раздела' : undefined}
                >
                    {!hasPromo && (
                        <h1 id={titleId} className={styles.title}>
                            {title}
                        </h1>
                    )}
                    {termFilter && <ArchiveTermFilter {...termFilter} />}
                    {!!postsData?.length && postType && (
                        <div className={styles.list}>
                            {postsData.map((postData) => (
                                <PostArchiveCard
                                    key={postData.url}
                                    postData={postData}
                                    postType={postType}
                                    className={styles.card}
                                />
                            ))}
                        </div>
                    )}
                    <Pagination
                        getPageHref={getPageHref}
                        pagination={
                            paginationInfo
                                ? {
                                      page: paginationInfo.currentPage,
                                      pagesCount: paginationInfo.pagesCount,
                                  }
                                : null
                        }
                    />
                </Section>
            </Content>
            <Sidebar>sidebar</Sidebar>
        </>
    );
};

export default ArchiveTPL;

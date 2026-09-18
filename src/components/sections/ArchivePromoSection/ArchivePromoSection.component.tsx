import { FC } from 'react';
import ArchivePromoGallery from '@/components/sections/ArchivePromoSection/ArchivePromoGallery/ArchivePromoGallery.component';
import ArchivePromoIntro from '@/components/sections/ArchivePromoSection/ArchivePromoIntro/ArchivePromoIntro.component';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoSection.module.scss';
import { ArchivePromoSectionPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

const ArchivePromoSection: FC<ArchivePromoSectionPropsIF> = ({
    pathname,
    title,
    titleId,
    seoData = null,
    archivePromoData = null,
}) => (
    <section
        className={styles.archivePromoSectionWrapper}
        aria-labelledby={titleId}
    >
        <ArchivePromoIntro
            pathname={pathname}
            title={title}
            titleId={titleId}
            seoData={seoData}
        />
        {!!archivePromoData?.length && (
            <ArchivePromoGallery archivePromoData={archivePromoData} />
        )}
    </section>
);

export default ArchivePromoSection;

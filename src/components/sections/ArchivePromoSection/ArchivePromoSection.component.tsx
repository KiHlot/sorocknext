import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
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
    <Section
        className={styles.archivePromoSectionWrapper}
        ariaLabel={title}
        ariaLabelledBy={titleId}
    >
        <ArchivePromoIntro
            pathname={pathname}
            title={title}
            titleId={titleId}
            seoData={seoData}
            className={styles.archivePromoIntro}
        />
        {!!archivePromoData?.length && (
            <ArchivePromoGallery
                archivePromoData={archivePromoData}
                className={styles.archivePromoGallery}
            />
        )}
    </Section>
);

export default ArchivePromoSection;

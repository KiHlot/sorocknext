import { FC } from 'react';
import styles from '@/components/blocks/Section/Section.module.scss';
import { SectionPropsIF } from '@/components/blocks/Section/Section.types';

const Section: FC<SectionPropsIF> = ({
    children,
    className = '',
    ariaLabel,
    ariaLabelledBy,
    title,
}) => (
    <section
        itemScope
        itemType="https://schema.org/WebPageElement"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={`${styles.sectionWrapper} ${className} ${title ? 'flcol gapBlock' : ''}`}
    >
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        {children}
    </section>
);

export default Section;

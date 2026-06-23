import { FC } from 'react';
import styles from '@/components/blocks/Section/Section.module.scss';
import { SectionPropsIF } from '@/components/blocks/Section/Section.types';

const Section: FC<SectionPropsIF> = ({
    children,
    className = '',
    ariaLabel,
    title,
}) => (
    <section
        itemScope
        itemType="https://schema.org/WebPageElement"
        aria-label={ariaLabel}
        className={`${styles.sectionWrapper} ${className}`}
    >
        {title && <h2>{title}</h2>}
        {children}
    </section>
);

export default Section;

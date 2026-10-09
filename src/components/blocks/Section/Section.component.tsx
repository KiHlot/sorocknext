import { FC } from 'react';
import {
    SECTION_DECOR_STROKE_WIDTH,
    SECTION_DECOR_VIEW_BOX,
} from '@/components/blocks/Section/Section.config';
import { getSectionDecorPaths } from '@/components/blocks/Section/Section.helpers';
import styles from '@/components/blocks/Section/Section.module.scss';
import { SectionPropsIF } from '@/components/blocks/Section/Section.types';

const Section: FC<SectionPropsIF> = ({
    children,
    className = '',
    ariaLabel,
    ariaLabelledBy,
    title,
    isDecorHidden = false,
}) => {
    const decorPaths = getSectionDecorPaths(ariaLabel, ariaLabelledBy, title);

    return (
        <section
            itemScope
            itemType="https://schema.org/WebPageElement"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={`${styles.sectionWrapper} ${className} ${title ? 'flcol gapBlock' : ''}`}
        >
            {isDecorHidden ? null : (
                <svg
                    className={styles.decor}
                    viewBox={SECTION_DECOR_VIEW_BOX}
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                    focusable="false"
                >
                    <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={SECTION_DECOR_STROKE_WIDTH}
                    >
                        {decorPaths.map((path) => (
                            <path key={path} d={path} />
                        ))}
                    </g>
                </svg>
            )}
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            {children}
        </section>
    );
};

export default Section;

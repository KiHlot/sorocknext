import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import styles from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.module.scss';
import { LastNewsPromoSectionPropsIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.types';

const LastNewsPromoSection: FC<LastNewsPromoSectionPropsIF> = ({
    className = '',
}) => {
    const temporary = 'LastNewsPromoWidget';

    return (
        <Section
            className={`${styles.lastNewsPromoSectionWrapper} ${className}`}
        >
            {temporary}
        </Section>
    );
};

export default LastNewsPromoSection;

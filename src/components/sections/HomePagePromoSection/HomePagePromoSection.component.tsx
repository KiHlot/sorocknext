import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import styles from '@/components/sections/HomePagePromoSection/HomePagePromoSection.module.scss';
import { HomePagePromoSectionPropsIF } from '@/components/sections/HomePagePromoSection/HomePagePromoSection.types';
import LastNewsPromoWidget from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.component';

const HomePagePromoSection: FC<HomePagePromoSectionPropsIF> = ({ data }) => (
    <Section className={styles.homePagePromoSectionWrapper}>
        <div className={styles.background} />
        <LastNewsPromoWidget className={styles.latestNews} data={{}} />
    </Section>
);

export default HomePagePromoSection;

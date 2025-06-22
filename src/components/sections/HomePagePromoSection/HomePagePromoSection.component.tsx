import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import styles from '@/components/sections/HomePagePromoSection/HomePagePromoSection.module.scss';
import { HomePagePromoSectionPropsIF } from '@/components/sections/HomePagePromoSection/HomePagePromoSection.types';
import PromoSiteInfo from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.component';
import LastNewsPromoWidget from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.component';

const HomePagePromoSection: FC<HomePagePromoSectionPropsIF> = ({
    className,
}) => {
    return (
        <Section
            className={`${styles.homePagePromoSectionWrapper} ${className}`}
        >
            <div className="backGround" />
            <PromoSiteInfo />
            <LastNewsPromoWidget data={{}} />
        </Section>
    );
};

export default HomePagePromoSection;

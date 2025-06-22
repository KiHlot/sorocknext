import { FC } from 'react';
import Block from '@/components/blocks/Block/Block.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.module.scss';
import { PromoSiteInfoPropsIF } from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.types';

const PromoSiteInfo: FC<PromoSiteInfoPropsIF> = ({ className }) => {
    const temp = 'PromoSiteInfo';

    return (
        <Block className={`${styles.promoSiteInfoWrapper} ${className} flcol`}>
            <div className={styles.logo}>
                <MainLogo />
            </div>
            <h1 className="title"></h1>
            <div className="subTitle"></div>
            <div className="content"></div>
            <div className="register"></div>
            <div className="categoryTitle"></div>
            <div className="categoryList"></div>
        </Block>
    );
};

export default PromoSiteInfo;

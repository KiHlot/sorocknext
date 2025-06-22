import { FC } from 'react';
import styles from '@/components/elems/PromoSiteInfo/PromoSiteInfo.module.scss';
import { PromoSiteInfoPropsIF } from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.types';

const PromoSiteInfo: FC<PromoSiteInfoPropsIF> = ({ className = '' }) => {
    const temp = 'PromoSiteInfo';

    return (
        <div className={`${styles.PromoSiteInfoWrapper} ${className}`}>
            {temp}
        </div>
    );
};

export default PromoSiteInfo;

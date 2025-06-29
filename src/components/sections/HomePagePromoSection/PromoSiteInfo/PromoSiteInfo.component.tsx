import { FC } from 'react';
import Block from '@/components/blocks/Block/Block.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.module.scss';
import { PromoSiteInfoPropsIF } from '@/components/sections/HomePagePromoSection/PromoSiteInfo/PromoSiteInfo.types';

const PromoSiteInfo: FC<PromoSiteInfoPropsIF> = ({ className, promoSiteInfo }) => {
    return (
        <Block
            className={`${styles.promoSiteInfoWrapper} ${className} flcol gapBlock`}
        >
            <div className={`flc ${styles.logoWrapper}`}>
                <MainLogo className={styles.logo} />
            </div>
            <div className={`flcol ${styles.titleWrapper}`}>
                <h1 className={styles.title}>Развлекательный портал</h1>
                <div className={styles.subTitle}>sorock.ru</div>
            </div>
            <div className={styles.content}>
                Добро пожаловать на наш развлекательный портал. Вы можете войти
                в свой аккаунт или создать новый
            </div>
            <MainButton variant="accent" href="/auth" className={styles.button}>
                Войти
            </MainButton>
            <div className={styles.categoryList}></div>
        </Block>
    );
};

export default PromoSiteInfo;

import { FC } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import PopularTags from '@/components/blocks/PopularTags/PopularTags.component';
import FooterMenuColumn from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.component';
import { FOOTER_MENU } from '@/components/sections/Footer/TopFooter/TopFooter.config';
import styles from '@/components/sections/Footer/TopFooter/TopFooter.module.scss';
import { TopFooterPropsIF } from '@/components/sections/Footer/TopFooter/TopFooter.types';

const TopFooter: FC<TopFooterPropsIF> = () => {
    return (
        <div className={styles.topFooterWrapper}>
            <MainWrapper className={styles.fullWrapper}>
                <div className={styles.footerCol}>
                    <div className={styles.title}>Теги</div>
                    <PopularTags />
                </div>

                <div className={`${styles.footerCol} ${styles.menu}`}>
                    <div className={styles.title}>Категории</div>
                    <FooterMenuColumn menuItems={FOOTER_MENU[947]} />
                </div>

                <div className={`${styles.footerCol} ${styles.menu}`}>
                    <div className={styles.title}>Разделы сайта</div>
                    <FooterMenuColumn menuItems={FOOTER_MENU[948]} />
                </div>

                <div className={`${styles.footerCol} ${styles.menu}`}>
                    <div className={styles.title}>Инфо</div>
                    <FooterMenuColumn menuItems={FOOTER_MENU[949]} />
                </div>

                <div className={styles.footerCol}>
                    <div className={styles.title}>Обратная связь</div>
                    {/*<ContactForm />*/}
                </div>
            </MainWrapper>
        </div>
    );
};

export default TopFooter;

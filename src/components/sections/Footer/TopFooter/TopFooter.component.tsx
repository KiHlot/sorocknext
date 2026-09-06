import { FC } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import ContactForm from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.component';
import FooterMenuColumn from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.component';
import { FOOTER_MENU } from '@/components/sections/Footer/TopFooter/TopFooter.config';
import styles from '@/components/sections/Footer/TopFooter/TopFooter.module.scss';
import PopularTagsWidget from '@/components/widgets/PopularTagsWidget/PopularTagsWidget.component';

const TopFooter: FC = () => (
    <div className={styles.topFooterWrapper}>
        <MainWrapper className={styles.fullWrapper}>
            <div className={styles.footerCol}>
                <div className={styles.title}>Теги</div>
                <PopularTagsWidget />
            </div>
            {Object.entries(FOOTER_MENU).map(([key, menu]) => (
                <div key={key} className={`${styles.footerCol} ${styles.menu}`}>
                    <div className={styles.title}>{menu.label}</div>
                    <FooterMenuColumn menuItems={menu.menuList} />
                </div>
            ))}
            <div className={styles.footerCol}>
                <div className={styles.title}>Обратная связь</div>
                <ContactForm />
            </div>
        </MainWrapper>
    </div>
);

export default TopFooter;

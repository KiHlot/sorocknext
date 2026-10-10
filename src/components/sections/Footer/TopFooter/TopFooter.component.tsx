import { FC } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import ContactForm from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.component';
import FooterMenuColumn from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.component';
import { FOOTER_MENU } from '@/components/sections/Footer/TopFooter/TopFooter.config';
import styles from '@/components/sections/Footer/TopFooter/TopFooter.module.scss';

const TopFooter: FC = () => (
    <div className={styles.topFooterWrapper}>
        <MainWrapper className={styles.fullWrapper}>
            {Object.entries(FOOTER_MENU).map(([key, menu]) => (
                <div key={key} className={`${styles.footerCol} ${styles.menu}`}>
                    <div className={styles.title}>{menu.label}</div>
                    <FooterMenuColumn menuItems={menu.menuList} />
                </div>
            ))}
            <div id="contact" className={styles.footerCol}>
                <div className={styles.title}>Обратная связь</div>
                <ContactForm />
            </div>
        </MainWrapper>
    </div>
);

export default TopFooter;

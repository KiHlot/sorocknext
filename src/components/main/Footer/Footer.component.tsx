import { FC } from 'react';
import styles from '@/components/main/Footer/Footer.module.scss';
import { FooterPropsIF } from '@/components/main/Footer/Footer.types';
import TopFooter from '@/components/main/Footer/TopFooter/TopFooter.component';

const Footer: FC<FooterPropsIF> = ({ className }) => {
    const temp = 'remove_this';

    return (
        <div className={`${styles.footerWrapper} ${className || ''}`}>
            <TopFooter />
        </div>
    );
};

export default Footer;

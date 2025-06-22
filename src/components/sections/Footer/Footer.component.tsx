import { FC } from 'react';
import styles from '@/components/sections/Footer/Footer.module.scss';
import { FooterPropsIF } from '@/components/sections/Footer/Footer.types';
import TopFooter from '@/components/sections/Footer/TopFooter/TopFooter.component';

const Footer: FC<FooterPropsIF> = ({ className }) => {
    return (
        <footer className={`${styles.footerWrapper} ${className || ''}`}>
            <TopFooter />
        </footer>
    );
};

export default Footer;

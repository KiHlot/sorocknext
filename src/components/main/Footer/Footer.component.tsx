import { FC } from 'react';
import styles from '@/components/main/Footer/Footer.module.scss';
import { FooterPropsIF } from '@/components/main/Footer/Footer.types';

const Footer: FC<FooterPropsIF> = ({ className }) => {
    const temp = 'remove_this';

    return <div className={`${styles.wrapper} ${className || ''}`}>Footer</div>;
};

export default Footer;

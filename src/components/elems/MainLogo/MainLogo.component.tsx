import { FC } from 'react';
import Link from 'next/link';
import MainLogoSVG from '@/images/svg/svg_main_logo.svg';
import styles from '@/components/elems/MainLogo/MainLogo.module.scss';
import { MainLogoPropsIF } from '@/components/elems/MainLogo/MainLogo.types';

const MainLogo: FC<MainLogoPropsIF> = ({ className = '' }) => (
    <div className={`flc ${styles.mainLogoWrapper} ${className}`}>
        <MainLogoSVG />
        <Link href="/" aria-label="На главную" />
    </div>
);

export default MainLogo;

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLogoSVG from '@/images/svg/svg_main_logo.svg?url';
import styles from '@/components/elems/MainLogo/MainLogo.module.scss';
import { MainLogoPropsIF } from '@/components/elems/MainLogo/MainLogo.types';

const MainLogo: FC<MainLogoPropsIF> = ({ className = '' }) => (
    <div className={`flc ${styles.mainLogoWrapper} ${className}`}>
        <Image src={MainLogoSVG} alt="Логотип" />
        <Link href="/" aria-label="На главную" />
    </div>
);

export default MainLogo;

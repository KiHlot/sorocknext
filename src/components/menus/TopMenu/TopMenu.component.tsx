import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import { TopMenuPropsIF } from '@/components/menus/TopMenu/TopMenu.types';
import { FC } from 'react';

const TopMenu: FC<TopMenuPropsIF> = ({ className }) => {
    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            <MainLogo />
        </div>
    );
};

export default TopMenu;

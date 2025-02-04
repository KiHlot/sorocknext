import { FC } from 'react';
import { LEFT_MENU } from '@/components/menus/LeftMenu/LeftMenu.config';
import styles from '@/components/menus/LeftMenu/LeftMenu.module.scss';
import { LeftMenuPropsIF } from '@/components/menus/LeftMenu/LeftMenu.types';
import LeftMenuItem from '@/components/menus/LeftMenu/LeftMenuItem/LeftMenuItem.component';

const LeftMenu: FC<LeftMenuPropsIF> = () => {
    return (
        <div className={`cvscroll ${styles.leftMenuWrapper}`}>
            <ul>
                {LEFT_MENU.map(item => (
                    <LeftMenuItem key={item.url} data={item} />
                ))}
            </ul>
        </div>
    );
};

export default LeftMenu;

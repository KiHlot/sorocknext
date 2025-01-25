import { FC } from 'react';
import LeftMenuItem from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuItem/LeftMenuItem.component';
import { LEFT_MENU } from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuList.config';
import styles from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuList.module.scss';
import { LeftMenuListPropsIF } from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuList.types';

const LeftMenuList: FC<LeftMenuListPropsIF> = ({ className }) => {
    return (
        <div className={`${className || ''} ${styles.leftMenuListWrapper} cvscroll`}>
            <ul>
                {LEFT_MENU.map(item => (
                    <LeftMenuItem key={item.url} data={item} />
                ))}
            </ul>
        </div>
    );
};

export default LeftMenuList;

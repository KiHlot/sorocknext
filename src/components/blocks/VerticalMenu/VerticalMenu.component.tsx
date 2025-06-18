import { FC } from 'react';
import styles from '@/components/blocks/VerticalMenu/VerticalMenu.module.scss';
import { VerticalMenuPropsIF } from '@/components/blocks/VerticalMenu/VerticalMenu.types';
import VerticalMenuItem from '@/components/blocks/VerticalMenu/VerticalMenuItem/VerticalMenu.component';

const VerticalMenu: FC<VerticalMenuPropsIF> = ({
    className = '',
    menuList,
}) => {
    return (
        <nav
            role="left menu"
            className={`${styles.verticalMenuWrapper} ${className}`}
        >
            <ul className="flcol">
                {menuList.map(item => (
                    <VerticalMenuItem key={item.url} data={item} />
                ))}
            </ul>
        </nav>
    );
};

export default VerticalMenu;

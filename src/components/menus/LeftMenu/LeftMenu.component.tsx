import { FC } from 'react';
import { LEFT_MENU } from '@/components/menus/LeftMenu/LeftMenu.config';
import VerticalMenu from '@/components/blocks/VerticalMenu/VerticalMenu.component';

const LeftMenu: FC = () => {
    return <VerticalMenu menuList={LEFT_MENU} />;
};

export default LeftMenu;

import { FC } from 'react';
import VerticalMenu from '@/components/main/VerticalMenu/VerticalMenu.component';
import { LEFT_MENU } from '@/components/menus/LeftMenu/LeftMenu.config';

const LeftMenu: FC = () => {
    return <VerticalMenu menuList={LEFT_MENU} />;
};

export default LeftMenu;

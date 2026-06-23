import { FC } from 'react';
import Block from '@/components/blocks/Block/Block.component';
import VerticalMenu from '@/components/blocks/VerticalMenu/VerticalMenu.component';
import { ADMIN_MENU } from '@/components/menus/AdminMenu/AdminMenu.config';

const AdminMenu: FC = () => (
    <Block>
        <VerticalMenu menuList={ADMIN_MENU} />
    </Block>
);

export default AdminMenu;

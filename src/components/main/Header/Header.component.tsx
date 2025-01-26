import { FC } from 'react';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';

const Header: FC = () => {
    return (
        <>
            <TopMenu />
            <LeftMenu />
        </>
    );
};

export default Header;

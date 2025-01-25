import styles from 'components/common/ButtonComponent/ButtonComponent.module.scss';
import { FC } from 'react';
import { HeaderPropsIF } from '@/components/main/Header/Header.types';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';

const Header: FC<HeaderPropsIF> = ({ className }) => {

    return (
        <>
            <TopMenu />
            <LeftMenu />
        </>
    );
};

export default Header;

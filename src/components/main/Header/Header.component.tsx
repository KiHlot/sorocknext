import { HeaderPropsIF } from '@/components/main/Header/Header.types';
import TopMenu from '@/components/menus/TopMenu/TopMenu.component';
import { FC } from 'react';
import styles from 'components/common/ButtonComponent/ButtonComponent.module.scss';

const Header: FC<HeaderPropsIF> = ({ className }) => {
    const temp = 'remove_this';

    return (
        <>
            <TopMenu />
        </>
    );
};

export default Header;

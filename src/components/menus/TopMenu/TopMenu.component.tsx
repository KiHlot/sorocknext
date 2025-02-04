import { FC } from 'react';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import TrendsSlider from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.component';

const TopMenu: FC = () => {
    return (
        <div className={`hide ${styles.topMenuWrapper}`}>
            <MainLogo className={styles.logo} />
            <TrendsSlider />
            <SearchForm />
            <SiteEmail />
        </div>
    );
};

export default TopMenu;

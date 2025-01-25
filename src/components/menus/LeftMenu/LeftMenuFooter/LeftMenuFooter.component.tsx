import { FC } from 'react';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import styles from '@/components/menus/LeftMenu/LeftMenuFooter/LeftMenuFooter.module.scss';
import { LeftMenuFooterPropsIF } from '@/components/menus/LeftMenu/LeftMenuFooter/LeftMenuFooter.types';

const LeftMenuFooter: FC<LeftMenuFooterPropsIF> = ({ className }) => {
    return (
        <div className={`${styles.leftMenuFooterWrapper} ${className}`}>
            <SiteEmail className={styles.siteEmail} />
        </div>
    );
};

export default LeftMenuFooter;

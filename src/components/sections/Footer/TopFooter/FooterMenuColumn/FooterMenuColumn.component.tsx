import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.module.scss';
import { FooterMenuColumnPropsIF } from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.types';

const FooterMenuColumn: FC<FooterMenuColumnPropsIF> = ({ menuItems }) => {
    return (
        <div className={styles.menuColumn}>
            {menuItems.map(({ uri, label }) => (
                <Link key={uri} href={uri}>
                    {label}
                </Link>
            ))}
        </div>
    );
};

export default FooterMenuColumn;

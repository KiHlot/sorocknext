import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.module.scss';
import { FooterMenuColumnPropsIF } from '@/components/sections/Footer/TopFooter/FooterMenuColumn/FooterMenuColumn.types';

const FooterMenuColumn: FC<FooterMenuColumnPropsIF> = ({ menuItems }) => (
    <div className={styles.menuColumn}>
        {menuItems.map(({ url, label }) => (
            <Link key={url} href={url}>
                {label}
            </Link>
        ))}
    </div>
);

export default FooterMenuColumn;

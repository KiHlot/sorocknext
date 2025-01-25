import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuItem/LeftMenuItem.module.scss';
import { LeftMenuItemPropsIF } from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuItem/LeftMenuItem.types';

const LeftMenuItem: FC<LeftMenuItemPropsIF> = ({ data }) => {
    const { label, url, icon } = data;

    const pathname = usePathname();

    const [isCurrent, setIsCurrent] = useState<boolean>(false);

    useEffect(() => {
        if (!pathname) {
            return;
        }

        setIsCurrent(pathname.includes(url));
    }, [pathname]);

    return (
        <div className={styles.leftMenuItemWrapper}>
            <Link
                href={url}
                title={label}
                className={isCurrent ? styles.current : ''}
            >
                <span className={`${styles.icon} flc`}>{icon}</span>
                <span>{label}</span>
            </Link>
        </div>
    );
};

export default LeftMenuItem;

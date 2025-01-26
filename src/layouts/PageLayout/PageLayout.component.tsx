import { FC } from 'react';
import styles from '@/layouts/PageLayout/PageLayout.module.scss';
import { PageLayoutPropsIF } from '@/layouts/PageLayout/PageLayout.types';

const PageLayout: FC<PageLayoutPropsIF> = ({ children }) => {
    const temp = 'remove_this';

    return (
			<div className={styles.pageLayoutWrapper}>{children}</div>
    );
};

export default PageLayout;

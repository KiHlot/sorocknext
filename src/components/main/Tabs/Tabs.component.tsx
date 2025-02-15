import { FC } from 'react';
import styles from '@/components/main/Tabs/Tabs.module.scss';
import { TabsPropsIF } from '@/components/main/Tabs/Tabs.types';

const Tabs: FC<TabsPropsIF> = ({
    config,
    controls,
    className = '',
    fullWidth,
}) => {
    const { activeTab, setActiveTab } = controls;

    return (
        <div className={`${styles.tabsWrapper} ${className}`}>
            <div
                className={`${styles.headLine} ${fullWidth ? styles.fullWidth : ''}`}
            >
                {config.map(({ key, label }) => (
                    <button
                        type="button"
                        key={key}
                        className={`${styles.tabButton} ${key === activeTab ? styles.active : ''}`}
                        onClick={() => setActiveTab(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className={styles.bodyLine}>
                {
                    config.filter(({ key: tabKey }) => tabKey === activeTab)[0]
                        ?.elem
                }
            </div>
        </div>
    );
};

export default Tabs;

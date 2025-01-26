import { FC } from 'react';
import CronInfo from '@/templates/CronTPL/CronInfo/CronInfo.component';
import styles from '@/templates/CronTPL/CronTPL.module.scss';
import { CronTPLPropsIF } from '@/templates/CronTPL/CronTPL.types';

const CronTPL: FC<CronTPLPropsIF> = ({ data }) => {
    return (
        <div className={`the_content flcol ${styles.cronTPLWrapper}`}>
            <div className={styles.pageTitle}>
                <h1>Настройки крона</h1>
            </div>

            <CronInfo data={data} />

            {/*{helpData.map(({ title, buttonLabel }) => (*/}
            {/*    <div key={title} className={styles.block}>*/}
            {/*        <div className={styles.title}>{title}</div>*/}
            {/*        <button className={styles.updateButton}>*/}
            {/*            {buttonLabel}*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
};

export default CronTPL;

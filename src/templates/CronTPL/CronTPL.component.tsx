import { FC } from 'react';
import NoData from '@/components/elems/NoData/NoData.component';
import CronInfo from '@/templates/CronTPL/CronInfo/CronInfo.component';
import styles from '@/templates/CronTPL/CronTPL.module.scss';
import { CronTPLPropsIF } from '@/templates/CronTPL/CronTPL.types';
import CronTable from '@/templates/CronTPL/CronTable/CronTable.component';

const CronTPL: FC<CronTPLPropsIF> = ({ data }) => {
    return (
        <div className={`flcol ${styles.cronTPLWrapper}`}>
            <div className={styles.pageTitle}>
                <h1>Настройки крона</h1>
            </div>
            <CronInfo modifyData={data?.modifyData} />
            {data?.jsonStatuses ? (
                <CronTable jsonStatuses={data.jsonStatuses} />
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default CronTPL;

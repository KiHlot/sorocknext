'use client';

import { FC } from 'react';
import dayjs from '~/dayjs';
import { RxUpdate } from '~/react-icons/rx';
import { adminApi } from '@/api/admin/admin';
import { formatDate } from '@/helpers/utils';
import Table, {
    RowItem,
    TableRow,
} from '@/components/blocks/Table/Table.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { TIME_FORMAT } from '@/configs/config';
import { TABLE_TITLES } from '@/templates/CronTPL/CronTable/CronTable.config';
import styles from '@/templates/CronTPL/CronTable/CronTable.module.scss';
import { CronTablePropsIF } from '@/templates/CronTPL/CronTable/CronTable.types';

const CronTable: FC<CronTablePropsIF> = ({ jsonStatuses, setCronInfoData }) => {
    const [updateCronTask, { isLoading: updateCronTaskLoading }] =
        adminApi.useUpdateCronTaskMutation();
    const [getCronInfo, { isLoading: cronInfoLoading }] =
        adminApi.useLazyGetCronInfoQuery();

    const updateTask = (taskName: string) => {
        updateCronTask(taskName)
            .unwrap()
            .finally(() => {
                getCronInfo()
                    .unwrap()
                    .then(data => {
                        setCronInfoData(data?.data || null);
                    });
            });
    };

    return (
        <Table titles={TABLE_TITLES}>
            {Object.entries(jsonStatuses)?.map(([taskName, value]) => (
                <TableRow key={taskName}>
                    <RowItem>{value?.label || 'Нет названия'}</RowItem>
                    <RowItem>
                        {formatDate(value?.lastUpdate, 'withTime')}
                    </RowItem>
                    <RowItem
                        className={styles[value?.lastUpdateStatus || 'error']}
                    >
                        {value?.lastUpdateStatus || 'Нет статуса'}
                    </RowItem>
                    <RowItem>{value?.updatedBy || 'Нет автора'}</RowItem>
                    <RowItem>{value?.itemsCount || '-'}</RowItem>
                    <RowItem>
                        <MainButton
                            variant="default"
                            clickHandler={() => updateTask(taskName)}
                            className={styles.updateButton}
                            disabled={updateCronTaskLoading || cronInfoLoading}
                            icon={<RxUpdate />}
                        />
                    </RowItem>
                </TableRow>
            ))}
        </Table>
    );
};

export default CronTable;

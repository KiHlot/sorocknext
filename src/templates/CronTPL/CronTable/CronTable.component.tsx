'use client'

import { FC } from 'react';
import Table, {
    RowItem,
    TableRow,
} from '@/components/main/Table/Table.component';
import { TABLE_TITLES } from '@/templates/CronTPL/CronTable/CronTable.config';
import { CronTablePropsIF } from '@/templates/CronTPL/CronTable/CronTable.types';

const CronTable: FC<CronTablePropsIF> = ({ jsonStatuses }) => {
    
    const updateCronTask = () => {
    
    }
    
    return (
        <Table titles={TABLE_TITLES}>
            {Object.entries(jsonStatuses)?.map(([key, value]) => (
                <TableRow key={key}>
                    <RowItem>{value?.label || 'Нет названия'}</RowItem>
                    <RowItem>{value?.lastUpdate || 'Нет даты'}</RowItem>
                    <RowItem>
                        {value?.lastUpdateStatus || 'Нет статуса'}
                    </RowItem>
                    <RowItem>{value?.updatedBy || 'Нет автора'}</RowItem>
                    <RowItem>button</RowItem>
                </TableRow>
            ))}
        </Table>
    );
};

export default CronTable;

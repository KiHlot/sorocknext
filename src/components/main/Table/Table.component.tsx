import { FC } from 'react';
import styles from '@/components/main/Table/Table.module.scss';
import {
    RowItemPropsIF,
    TablePropsIF,
    TableRowPropsIF,
} from '@/components/main/Table/Table.types';

const Table: FC<TablePropsIF> = ({ titles, children, className = '' }) => {
    return (
        <table className={`${styles.tableWrapper} ${className}`}>
            {titles && (
                <thead className={styles.tableHeader}>
                    <TableRow>
                        {titles.map(({ title }) => (
                            <th key={title}>{title}</th>
                        ))}
                    </TableRow>
                </thead>
            )}
            <tbody>{children}</tbody>
        </table>
    );
};

export const TableRow: FC<TableRowPropsIF> = ({ children }) => {
    return <tr className={styles.tableRowWrapper}>{children}</tr>;
};

export const RowItem: FC<RowItemPropsIF> = ({ children, className = '' }) => {
    return <td className={className}>{children}</td>;
};

export default Table;

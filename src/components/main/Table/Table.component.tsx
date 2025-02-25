import { FC } from 'react';
import CheckBoxBase from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.component';
import styles from '@/components/main/Table/Table.module.scss';
import {
    RowItemPropsIF,
    TablePropsIF,
    TableRowPropsIF,
} from '@/components/main/Table/Table.types';

const Table: FC<TablePropsIF> = ({
    titles,
    children,
    setSelected,
    className = '',
}) => {
    return (
        <table className={`${styles.tableWrapper} ${className}`}>
            {titles && (
                <thead className={styles.tableHeader}>
                    <TableRow>
                        {setSelected && (
                            <th>
                                {/*//TODO here checkbox*/}
                                <CheckBoxBase name="select_all" />
                            </th>
                        )}
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

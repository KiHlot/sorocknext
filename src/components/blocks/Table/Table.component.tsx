import { ChangeEvent, FC } from 'react';
import styles from '@/components/blocks/Table/Table.module.scss';
import {
    RowItemPropsIF,
    TablePropsIF,
    TableRowPropsIF,
} from '@/components/blocks/Table/Table.types';
import CheckBoxBase from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.component';

const Table: FC<TablePropsIF> = ({
    titles,
    children,
    className = '',
    selectData,
}) => {
    const { selectAll, isAllSelected } = selectData || {};

    const selectHandler = (e: ChangeEvent<HTMLInputElement>) => {
        selectAll?.(e.target.checked);
    };

    return (
        <table className={`${styles.tableWrapper} ${className}`}>
            {titles && (
                <thead className={styles.tableHeader}>
                    <TableRow>
                        {selectData && (
                            <th
                                style={{
                                    width: '56px',
                                }}
                            >
                                <CheckBoxBase
                                    name="select_all"
                                    isChecked={isAllSelected}
                                    onChange={selectHandler}
                                />
                            </th>
                        )}
                        {titles.map(({ title, width }) => (
                            <th
                                key={title}
                                style={
                                    width ? { width: `${width}px` } : undefined
                                }
                            >
                                {title}
                            </th>
                        ))}
                    </TableRow>
                </thead>
            )}
            <tbody>{children}</tbody>
        </table>
    );
};

export const TableRow: FC<TableRowPropsIF> = ({
    children,
    isChecked = false,
}) => {
    return (
        <tr
            className={`${styles.tableRowWrapper} ${isChecked ? styles.checked : ''}`}
        >
            {children}
        </tr>
    );
};

export const RowItem: FC<RowItemPropsIF> = ({
    width,
    children,
    className = '',
}) => {
    return (
        <td
            style={
                width
                    ? {
                          width: `${width}px`,
                      }
                    : undefined
            }
            className={className}
        >
            {children}
        </td>
    );
};

export default Table;

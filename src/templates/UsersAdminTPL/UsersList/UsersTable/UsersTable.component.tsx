import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import Table, {
    RowItem,
    TableRow,
} from '@/components/blocks/Table/Table.component';
import Button from '@/components/controls/Button/Button.component';
import CheckBoxBase from '@/components/controls/CheckBox/CheckBoxBase/CheckBoxBase.component';
import Img from '@/components/elems/Img/Img.component';
import NoData from '@/components/elems/NoData/NoData.component';
import Pagination from '@/components/interactive/Pagination/Pagination.component';
import UserDetailModal from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.component';
import { TABLE_TITLES } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.config';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.module.scss';
import { UsersTablePropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.types';

const UsersTable: FC<UsersTablePropsIF> = ({
    usersList,
    pagination,
    isDataLoading,
    callbacks,
}) => {
    const { deleteUsers, updateUsers, updateRoles } = callbacks;

    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    const selectUsers = (userId: number, isAdd: boolean): void => {
        const result = isAdd
            ? [...selectedUsers, userId]
            : selectedUsers.filter((id) => id !== userId);

        setIsAllSelected(usersList?.length === result.length);

        setSelectedUsers(result);
    };

    const selectAll = (isAllSelected: boolean): void => {
        if (!usersList) {
            return;
        }

        setIsAllSelected(isAllSelected);

        if (isAllSelected) {
            setSelectedUsers(usersList.map((user) => user.userId));
        } else {
            setSelectedUsers([]);
        }
    };

    useEffect(() => {
        setIsAllSelected(false);
        setSelectedUsers([]);
    }, [usersList]);

    return (
        <div className="flcol gapLayout">
            <div className={styles.buttonsLine}>
                <Button
                    className={styles.delete}
                    icon={<AiOutlineDelete />}
                    disabled={selectedUsers.length === 0 || isDataLoading}
                    clickHandler={() => deleteUsers(selectedUsers)}
                    dataTest="users_table_delete_selected"
                >
                    Удалить
                </Button>
                <Button
                    className={styles.update}
                    icon={<RxUpdate />}
                    disabled={selectedUsers.length === 0 || isDataLoading}
                    clickHandler={() => updateUsers(selectedUsers)}
                    dataTest="users_table_update_selected"
                >
                    Обновить юзеров
                </Button>
                <Button
                    className={styles.update}
                    icon={<RxUpdate />}
                    disabled={isDataLoading}
                    clickHandler={updateRoles}
                    dialogText={<>Обновить роли всех юзеров?</>}
                    dataTest="users_table_update_roles"
                >
                    Обновить роли
                </Button>
            </div>

            {usersList?.length ? (
                <Table
                    titles={TABLE_TITLES}
                    selectData={{ selectAll, isAllSelected }}
                >
                    {usersList.map((item) => (
                        <TableRow
                            key={item.userId}
                            isChecked={selectedUsers.includes(item.userId)}
                        >
                            <RowItem>
                                <CheckBoxBase
                                    name={`box_${item.userId}`}
                                    isChecked={selectedUsers.includes(
                                        item.userId,
                                    )}
                                    onChange={(e) =>
                                        selectUsers(
                                            item.userId,
                                            e.target.checked,
                                        )
                                    }
                                />
                            </RowItem>
                            <RowItem>{item.userId}</RowItem>
                            <RowItem>
                                <Link href={item.userUrl}>
                                    <Img
                                        className={styles.avatar}
                                        url={item.avatarUrl}
                                    />
                                </Link>
                            </RowItem>
                            <RowItem>
                                <Link
                                    href={item.userUrl}
                                >{`${item.metrics.firstName} ${item.metrics.lastName}`}</Link>
                            </RowItem>
                            <RowItem>{item.contacts.emailPublic}</RowItem>
                            <RowItem>{item.role}</RowItem>
                            <RowItem>
                                {item.activity.registrationDate
                                    ? dayjs(
                                          item.activity.registrationDate,
                                      ).format('DD.MM.YYYY')
                                    : '-'}
                            </RowItem>
                            <RowItem>
                                {item.activity.lastActivity
                                    ? dayjs(item.activity.lastActivity).format(
                                          'DD.MM.YYYY',
                                      )
                                    : '-'}
                            </RowItem>
                            <RowItem>
                                <UserDetailModal
                                    disabled={isDataLoading}
                                    useId={item.userId}
                                />
                            </RowItem>
                            <RowItem>
                                <Button
                                    clickHandler={() =>
                                        updateUsers([item.userId])
                                    }
                                    variant="sq"
                                    disabled={isDataLoading}
                                    dataTest={`users_table_update_user_${item.userId}`}
                                >
                                    <RxUpdate />
                                </Button>
                            </RowItem>
                            <RowItem>
                                <Button
                                    clickHandler={() =>
                                        deleteUsers([item.userId])
                                    }
                                    variant="sq_error"
                                    dialogText={<>Удалить?</>}
                                    disabled={isDataLoading}
                                    dataTest={`users_table_delete_user_${item.userId}`}
                                >
                                    <AiOutlineDelete />
                                </Button>
                            </RowItem>
                        </TableRow>
                    ))}
                </Table>
            ) : (
                <NoData />
            )}
            <Pagination pagination={pagination} />
        </div>
    );
};

export default UsersTable;

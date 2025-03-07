import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/api/admin/admin';
import { normalizeImage } from '@/helpers/utils';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import NoData from '@/components/elems/NoData/NoData.component';
import CheckBoxBase from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.component';
import Pagination from '@/components/main/Pagination/Pagination.component';
import Table, {
    RowItem,
    TableRow,
} from '@/components/main/Table/Table.component';
import UserDetailModal from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.component';
import { TABLE_TITLES } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.config';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.module.scss';
import { UsersTablePropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.types';

const UsersTable: FC<UsersTablePropsIF> = ({
    usersList,
    updateOldUsers,
    pagination,
    isFilterLoading,
}) => {
    const router = useRouter();

    const [, { isLoading: isUsersUpdating }] = adminApi.useUpdateUsersMutation({
        fixedCacheKey: 'updateUsers',
    });
    const [updateRoles, { isLoading: isRolesUpdating }] =
        adminApi.useUpdateRolesMutation();

    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

    const selectUsers = (userId: number, isAdd: boolean) => {
        const result = isAdd
            ? [...selectedUsers, userId]
            : selectedUsers.filter(id => id !== userId);

        setIsAllSelected(usersList?.length === result.length);

        setSelectedUsers(result);
    };

    const selectAll = (isAllSelected: boolean) => {
        if (!usersList) return;

        setIsAllSelected(isAllSelected);

        if (isAllSelected) {
            setSelectedUsers(usersList.map(user => user.userId));
        } else {
            setSelectedUsers([]);
        }
    };

    const updateUserRoles = async () => {
        updateRoles().finally(() => {
            router.refresh();
        });
    };

    useEffect(() => {
        setIsDataLoading(isUsersUpdating || isRolesUpdating || isFilterLoading);
    }, [isUsersUpdating, isRolesUpdating, isFilterLoading]);

    useEffect(() => {
        setIsAllSelected(false);
        setSelectedUsers([]);
    }, [usersList]);

    return (
        <div className={`flcol ${styles.usersTableWrapper}`}>
            <div className={styles.buttonsLine}>
                <MainButton
                    className={styles.delete}
                    icon={<AiOutlineDelete />}
                    disabled={!selectedUsers.length || isDataLoading}
                >
                    Удалить
                </MainButton>
                <MainButton
                    className={styles.update}
                    icon={<RxUpdate />}
                    disabled={!selectedUsers.length || isDataLoading}
                    clickHandler={() => updateOldUsers(selectedUsers)}
                >
                    Обновить юзеров
                </MainButton>
                <MainButton
                    className={styles.update}
                    icon={<RxUpdate />}
                    disabled={isDataLoading}
                    clickHandler={updateUserRoles}
                    dialogText={<>Обновить роли всех юзеров?</>}
                >
                    Обновить роли
                </MainButton>
            </div>

            {usersList?.length ? (
                <Table
                    titles={TABLE_TITLES}
                    selectData={{ selectAll, isAllSelected }}
                >
                    {usersList.map(item => (
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
                                    onChange={e =>
                                        selectUsers(
                                            item.userId,
                                            e.target.checked,
                                        )
                                    }
                                />
                            </RowItem>
                            <RowItem>{item.userId}</RowItem>
                            <RowItem>
                                <div
                                    className={`bgc ${styles.avatar}`}
                                    style={{
                                        backgroundImage: `url(${normalizeImage(item.avatarUrl, 'user80')})`,
                                    }}
                                />
                            </RowItem>
                            <RowItem>
                                <Link
                                    className={styles.link}
                                    href={item.userUrl}
                                >{`${item.metrics.firstName} ${item.metrics.lastName}`}</Link>
                            </RowItem>
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
                                <MainButton
                                    clickHandler={() =>
                                        updateOldUsers([item.userId])
                                    }
                                    variant="sq"
                                    disabled={isDataLoading}
                                    icon={<RxUpdate />}
                                />
                            </RowItem>
                            <RowItem>
                                <MainButton
                                    clickHandler={() =>
                                        updateOldUsers([item.userId])
                                    }
                                    variant="sq_delete"
                                    dialogText={<>Удалить?</>}
                                    disabled={isDataLoading}
                                    icon={<AiOutlineDelete />}
                                />
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

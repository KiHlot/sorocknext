import { FC, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import Link from 'next/link';
import { siteApi } from '@/api/site/site';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import NoData from '@/components/elems/NoData/NoData.component';
import CheckBoxBase from '@/components/form/CheckBox/CheckBoxBase/CheckBoxBase.component';
import Table, {
    RowItem,
    TableRow,
} from '@/components/main/Table/Table.component';
import UserDetailModal from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.component';
import { TABLE_TITLES } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.config';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.module.scss';
import { UsersTablePropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.types';

const UsersTable: FC<UsersTablePropsIF> = ({ usersList, updateOldUsers }) => {
    const [, { isLoading: isUsersUpdating }] = siteApi.useUpdateUsersMutation({
        fixedCacheKey: 'updateUsers',
    });

    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

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

    return (
        <div className={`flcol ${styles.usersTableWrapper}`}>
            <div className={styles.buttonsLine}>
                <MainButton
                    className={styles.delete}
                    icon={<AiOutlineDelete />}
                    disabled={!selectedUsers.length}
                >
                    Удалить
                </MainButton>
                <MainButton
                    className={styles.update}
                    icon={<RxUpdate />}
                    disabled={!selectedUsers.length}
                    clickHandler={() => updateOldUsers(selectedUsers)}
                >
                    Обновить
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
                                        backgroundImage: `url(${item.avatarUrl})`,
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
                            <RowItem>{item.activity.registrationDate}</RowItem>
                            <RowItem>{item.activity.lastActivity}</RowItem>
                            <RowItem>-=-</RowItem>
                            <RowItem>
                                <UserDetailModal disabled={isUsersUpdating} />
                            </RowItem>
                            <RowItem>
                                <MainButton
                                    clickHandler={() =>
                                        updateOldUsers([item.userId])
                                    }
                                    variant="sq"
                                    disabled={isUsersUpdating}
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
                                    disabled={isUsersUpdating}
                                    icon={<AiOutlineDelete />}
                                />
                            </RowItem>
                        </TableRow>
                    ))}
                </Table>
            ) : (
                <NoData />
            )}
            <div className="pagination">123</div>
        </div>
    );
};

export default UsersTable;

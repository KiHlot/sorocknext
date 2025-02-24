import { FC } from 'react';
import { RxUpdate } from 'react-icons/rx';
import Link from 'next/link';
import { siteApi } from '@/api/site/site';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import NoData from '@/components/elems/NoData/NoData.component';
import Table, {
    RowItem,
    TableRow,
} from '@/components/main/Table/Table.component';
import UserDetailModal from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.component';
import { TABLE_TITLES } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.config';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.module.scss';
import { UsersTablePropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.types';
import { AiOutlineDelete } from "react-icons/ai";

const UsersTable: FC<UsersTablePropsIF> = ({ usersList, updateOldUsers }) => {
    const [, { isLoading: isUsersUpdating }] = siteApi.useUpdateUsersMutation({
        fixedCacheKey: 'updateUsers',
    });

    return (
        <div className={`flcol ${styles.usersTableWrapper}`}>
            {usersList?.length ? (
                <Table titles={TABLE_TITLES}>
                    {usersList.map(item => (
                        <TableRow key={item.userId}>
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
                            <RowItem>
                                {item.activity.registrationDate}
                            </RowItem>
                            <RowItem>{item.activity.lastActivity}</RowItem>
                            <RowItem>-=-</RowItem>
                            <RowItem>
                                <UserDetailModal
                                    disabled={isUsersUpdating}
                                />
                            </RowItem>
                            <RowItem>
                                <MainButton
                                    clickHandler={() =>
                                        updateOldUsers([item.userId])
                                    }
                                    variant="sq"
                                    disabled={isUsersUpdating}
                                >
                                    <RxUpdate />
                                </MainButton>
                            </RowItem>
                            <RowItem>
                                <MainButton
                                    clickHandler={() =>
                                        updateOldUsers([item.userId])
                                    }
                                    variant="sq_delete"
                                    dialogText={<>Удалить?</>}
                                    disabled={isUsersUpdating}
                                >
                                    <AiOutlineDelete />
                                </MainButton>
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

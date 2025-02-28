'use client';

import { FC, useEffect, useState } from 'react';
import { adminApi } from '@/api/admin/admin';
import { usersApi } from '@/api/users/users';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersList.module.scss';
import { UsersListPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersList.types';
import UsersTable from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.component';
import { PaginationIF } from '@/types/common';
import { UserIF } from '@/types/user';

const UsersList: FC<UsersListPropsIF> = ({ filterResult }) => {
    const [filter, { data: filteredData, isLoading, isSuccess }] =
        usersApi.useFilterMutation();
    const [updateUsers] = adminApi.useUpdateUsersMutation({
        fixedCacheKey: 'updateUsers',
    });

    const [usersList, setUsersList] = useState<UserIF[] | null>(null);
    const [pagination, setPagination] = useState<PaginationIF | null>(null);

    const updateOldUsers = (usersIds: number[]) => {
        updateUsers(usersIds)
            .unwrap()
            .then(data => {
                if (data.result === 'ok') {
                    //TODO get updated users data
                }
            });
    };

    useEffect(() => {
        setUsersList(filterResult?.filteredData || null);
        setPagination(filterResult?.pagination || null);
    }, [filterResult]);

    return (
        <div className={`flcol ${styles.usersListWrapper}`}>
            <div className="filter"></div>
            <UsersTable
                usersList={usersList}
                updateOldUsers={updateOldUsers}
                pagination={pagination}
            />
        </div>
    );
};

export default UsersList;

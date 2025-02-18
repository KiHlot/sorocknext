'use client';

import { FC, useEffect, useState } from 'react';
import { siteApi } from '@/api/site/site';
import { usersApi } from '@/api/users/users';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersList.module.scss';
import { UsersListPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersList.types';
import UsersTable from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.component';
import { UserIF } from '@/types/user';

const UsersList: FC<UsersListPropsIF> = ({ filterResult }) => {
    const [filter, { data: filteredData, isLoading, isSuccess }] =
        usersApi.useFilterMutation();
    const [updateUsers] = siteApi.useUpdateUsersMutation({
        fixedCacheKey: 'updateUsers',
    });

    const [usersList, setUsersList] = useState<UserIF[] | null>(null);

    const updateOldUsers = (usersId: number[]) => {
        updateUsers(usersId)
            .unwrap()
            .then(data => {
                if (data.result === 'ok') {
                    //TODO get updated users data
                }
            });
    };

    useEffect(() => {
        setUsersList(filterResult?.filteredData || null);
    }, [filterResult]);

    return (
        <div className={`flcol ${styles.usersListWrapper}`}>
            <div className="filter"></div>
            <UsersTable usersList={usersList} updateOldUsers={updateOldUsers} />
        </div>
    );
};

export default UsersList;

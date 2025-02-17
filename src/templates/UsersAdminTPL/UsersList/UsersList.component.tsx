'use client';

import { FC, useEffect, useState } from 'react';
import { usersApi } from '@/api/users/users';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersList.module.scss';
import { UsersListPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersList.types';
import { UserIF } from '@/types/user';

const UsersList: FC<UsersListPropsIF> = ({ filterResult }) => {
    const [filter, { data: filteredData, isLoading, isSuccess }] =
        usersApi.useFilterMutation();

    const [usersList, setUsersList] = useState<UserIF[] | null>(null);

    useEffect(() => {
        setUsersList(filterResult?.filteredData || null);
    }, [filterResult]);
    //TODO
    return (
        <div className={styles.usersListWrapper}>
            {usersList?.map((item, index) => (
                <div key={index} className="asd">
                    {item.userLogin}
                </div>
            ))}
        </div>
    );
};

export default UsersList;

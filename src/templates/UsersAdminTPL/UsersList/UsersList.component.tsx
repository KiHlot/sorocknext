'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { redirect } from '~/next/navigation';
import { adminApi } from '@/api/admin/admin';
import { usersApi } from '@/api/users/users';
import { normalizeFilter } from '@/helpers/utils';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersList.module.scss';
import { UsersListPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersList.types';
import UsersTable from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.component';
import { PaginationIF } from '@/types/common';
import { UserIF } from '@/types/user';

const UsersList: FC<UsersListPropsIF> = ({ filterResult }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filter, { isLoading: isFilterLoading }] =
        usersApi.useLazyFilterQuery();
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
                    filter(
                        normalizeFilter({
                            page: searchParams.get('page'),
                            column: searchParams.get('column'),
                            direction: searchParams.get('direction'),
                        }),
                    )
                        .unwrap()
                        .then(({ result, data }) => {
                            if (result === 'ok') {
                                if (data?.isRedirect) {
                                    redirect(
                                        `?${normalizeFilter({ page: data.pagination.page })}`,
                                    );
                                    return;
                                }
                                setUsersList(data?.filteredData || null);
                                setPagination(data?.pagination || null);
                            }
                        })
                        .catch(() => {
                            router.refresh();
                        });
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
                isFilterLoading={isFilterLoading}
            />
        </div>
    );
};

export default UsersList;

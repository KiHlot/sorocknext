'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams, redirect } from 'next/navigation';
import { adminApi } from '@/api/admin/admin';
import { DeleteUsersResultIF } from '@/api/admin/types';
import { usersApi } from '@/api/users/users';
import { normalizeFilter } from '@/helpers/utils';
import DeleteSuccessModal from '@/templates/UsersAdminTPL/UsersList/DeleteSuccessModal/DeleteSuccessModal.component';
import { UsersListPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersList.types';
import UsersTable from '@/templates/UsersAdminTPL/UsersList/UsersTable/UsersTable.component';
import { PaginationIF } from '@/types/common';
import { UserIF } from '@/types/user';

const UsersList: FC<UsersListPropsIF> = ({ filterResult }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filterUsersReq, { isLoading: isFilterLoading }] =
        usersApi.useLazyFilterQuery();
    const [updateUsersReq, { isLoading: isUsersUpdating }] =
        adminApi.useUpdateUsersMutation({
            fixedCacheKey: 'updateUsers',
        });
    const [deleteUsersReq, { isLoading: isUsersDeleting }] =
        adminApi.useDeleteUsersMutation({
            fixedCacheKey: 'deleteUsers',
        });
    const [updateRolesReq, { isLoading: isRolesUpdating }] =
        adminApi.useUpdateRolesMutation();

    const [usersList, setUsersList] = useState<UserIF[] | null>(null);
    const [pagination, setPagination] = useState<PaginationIF | null>(null);
    const [deletedUsersData, setDeletedUsersData] =
        useState<DeleteUsersResultIF | null>(null);
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

    const filterUsers = () => {
        filterUsersReq(
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
                        return redirect(
                            `?${normalizeFilter({ page: data.pagination.page })}`,
                        );
                    }
                    setUsersList(data?.filteredData || null);
                    setPagination(data?.pagination || null);
                }
            })
            .catch(() => {
                router.refresh();
            });
    };

    const deleteUsers = (usersIds: number[]) => {
        deleteUsersReq(usersIds)
            .unwrap()
            .then(({ result, data }) => {
                if (result === 'ok') {
                    setDeletedUsersData(data);
                    filterUsers();
                }
            });
    };

    const updateUsers = (usersIds: number[]) => {
        updateUsersReq(usersIds)
            .unwrap()
            .then(data => {
                if (data.result === 'ok') {
                    filterUsers();
                }
            });
    };

    const updateRoles = async () => {
        updateRolesReq().finally(() => {
            router.refresh();
        });
    };

    useEffect(() => {
        setUsersList(filterResult?.filteredData || null);
        setPagination(filterResult?.pagination || null);
    }, [filterResult]);

    useEffect(() => {
        setIsDataLoading(
            isUsersUpdating ||
                isRolesUpdating ||
                isFilterLoading ||
                isUsersDeleting,
        );
    }, [isUsersUpdating, isRolesUpdating, isFilterLoading, isUsersDeleting]);

    return (
        <div className="flcol gapLayout">
            <UsersTable
                usersList={usersList}
                callbacks={{
                    deleteUsers,
                    updateUsers,
                    updateRoles,
                }}
                pagination={pagination}
                isDataLoading={isDataLoading}
            />
            <DeleteSuccessModal
                isOpen={!!deletedUsersData}
                data={deletedUsersData}
                onClose={() => setDeletedUsersData(null)}
            />
        </div>
    );
};

export default UsersList;

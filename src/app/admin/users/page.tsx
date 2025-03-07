import { FC } from 'react';
import { redirect } from 'next/navigation';
import { getApi } from '@/store/functions';
import { normalizeFilter } from '@/helpers/utils';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';
import { UsersAdminTPLDataIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';
import { SearchParamsIF } from '@/types/common';

const UserUpdate: FC<SearchParamsIF> = async ({ searchParams }) => {
    const { page, column, direction } = await searchParams;

    const usersInfo = await getApi<UsersAdminTPLDataIF>(
        `/admin/get-users-info?${normalizeFilter({ page, column, direction })}`,
    );

    if (usersInfo?.filterResult?.isRedirect) {
        redirect(
            `?${normalizeFilter({ page: usersInfo.filterResult.pagination.page })}`,
        );
        return;
    }

    return (
        <AdminLayout isLoading={!usersInfo}>
            <UsersAdminTPL data={usersInfo} />
        </AdminLayout>
    );
};

export default UserUpdate;

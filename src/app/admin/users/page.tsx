import { FC } from 'react';
import { redirect } from 'next/navigation';
import { getApi } from '@/store/functions';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';
import { UsersAdminTPLDataIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';
import { SearchParamsIF } from '@/types/common';

const UserUpdate: FC<SearchParamsIF> = async ({ searchParams }) => {
    const { page } = await searchParams;

    const usersInfo = await getApi<UsersAdminTPLDataIF>(
        `/site/get-users-info?page=${page || 1}`,
    );

    if (usersInfo?.filterResult?.isRedirect) {
        redirect(`?page=${usersInfo.filterResult.pagination.page}`);
        return;
    }

    return (
        <AdminLayout>
            <UsersAdminTPL data={usersInfo} />
        </AdminLayout>
    );
};

export default UserUpdate;

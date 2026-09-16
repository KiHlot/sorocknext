import { ReactElement } from 'react';
import { redirect } from 'next/navigation';
import { PageProps } from '@/types/common';
import { fetchApi } from '@/helpers/fetchApi';
import { normalizeFilter } from '@/helpers/utils';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';
import { UsersAdminTPLDataIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';

export default async function UserUpdate({
    searchParams,
}: PageProps): Promise<ReactElement> {
    const { page, column, direction } = await searchParams;

    const usersInfo = await fetchApi<UsersAdminTPLDataIF>(
        `/admin/get-users-info?${normalizeFilter({ page, column, direction })}`,
    );

    if (usersInfo?.filterResult?.isRedirect) {
        redirect(
            `?${normalizeFilter({ page: usersInfo.filterResult.pagination.page })}`,
        );
    }

    return <UsersAdminTPL data={usersInfo} />;
}

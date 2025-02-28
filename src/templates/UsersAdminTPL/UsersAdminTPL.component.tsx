'use client';

import { FC, useEffect, useState } from 'react';
import { ResponseIF } from '@/store/types';
import { ModifyDataIF, UsersAdminJsonDataIF } from '@/api/site/types';
import AdminPromoBlock from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.component';
import styles from '@/templates/UsersAdminTPL/UsersAdminTPL.module.scss';
import { UsersAdminTPLPropsIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';
import UsersList from '@/templates/UsersAdminTPL/UsersList/UsersList.component';
import { adminApi } from '@/api/admin/admin';

const UsersAdminTPL: FC<UsersAdminTPLPropsIF> = ({ data }) => {
    const [updateCronTask, { isLoading }] = adminApi.useUpdateCronTaskMutation();

    const [modifyData, setModifyData] = useState<ModifyDataIF | null>(null);

    const updateTask = async () => {
        const result = (await updateCronTask(
            'users_info',
        ).unwrap()) as ResponseIF<UsersAdminJsonDataIF>;

        setModifyData(result?.data?.modifyData || null);
    };

    useEffect(() => {
        setModifyData(data?.jsonData?.modifyData || null);
    }, [data]);

    return (
        <div className={`flcol ${styles.usersAdminTPLWrapper}`}>
            <AdminPromoBlock
                title="Пользователи"
                isLoading={isLoading}
                modifyData={modifyData}
                clickHandler={updateTask}
            />
            <UsersList filterResult={data?.filterResult} />
        </div>
    );
};

export default UsersAdminTPL;

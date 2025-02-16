'use client';

import { FC, useEffect, useState } from 'react';
import { ResponseIF } from '@/store/types';
import { siteApi } from '@/api/site/site';
import { ModifyDataIF, UsersAdminJsonDataIF } from '@/api/site/types';
import AdminPromoBlock from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.component';
import styles from '@/templates/UsersAdminTPL/UsersAdminTPL.module.scss';
import { UsersAdminTPLPropsIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';
import { UserAdminIF } from '@/types/user';

const UsersAdminTPL: FC<UsersAdminTPLPropsIF> = ({ data }) => {
    const [updateCronTask, { isLoading }] = siteApi.useUpdateCronTaskMutation();

    const [modifyData, setModifyData] = useState<ModifyDataIF | null>(null);
    const [usersList, setUsersList] = useState<UserAdminIF[] | null>(null);

    const updateTask = async () => {
        const result = (await updateCronTask(
            'users_info',
        ).unwrap()) as ResponseIF<UsersAdminJsonDataIF>;

        setModifyData(result?.data?.modifyData || null);
        setUsersList(result?.data?.data || null);
    };

    useEffect(() => {
        setModifyData(data?.jsonData?.modifyData || null);
        setUsersList(data?.jsonData?.data || null);
    }, [data]);

    //TODO
    console.log('usersList', usersList);

    return (
        <div className={`flcol ${styles.usersAdminTPLWrapper}`}>
            <AdminPromoBlock
                title="Пользователи"
                isLoading={isLoading}
                modifyData={modifyData}
                clickHandler={updateTask}
            />
        </div>
    );
};

export default UsersAdminTPL;

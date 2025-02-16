'use client';

import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import adminStyles from '@/app/admin/admin.module.scss';
import Block from '@/components/blocks/Block/Block.component';
import styles from '@/templates/UsersAdminTPL/UsersAdminTPL.module.scss';
import { UsersAdminTPLPropsIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';

const UsersAdminTPL: FC<UsersAdminTPLPropsIF> = () => {
    const [updateCronTask, { isLoading }] = siteApi.useUpdateCronTaskMutation();

    const updateTask = () => {
        updateCronTask('users_info')
            .unwrap()
            .then(({ data }) => {
                console.log(data);
            });
    };

    return (
        <div className={`flcol ${styles.usersAdminTPLWrapper}`}>
            <Block className={`flcol ${styles.blockWrapper}`}>
                <h1 className={adminStyles.pageTitle}>Пользователи</h1>
                <button onClick={updateTask}>update</button>
            </Block>
        </div>
    );
};

export default UsersAdminTPL;

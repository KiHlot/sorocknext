import { FC } from 'react';
import adminStyles from '@/app/admin/admin.module.scss';
import Block from '@/components/blocks/Block/Block.component';
import styles from '@/templates/UsersAdminTPL/UsersAdminTPL.module.scss';
import { UsersAdminTPLPropsIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';

const UsersAdminTPL: FC<UsersAdminTPLPropsIF> = () => {
    return (
        <div className={`flcol ${styles.usersAdminTPLWrapper}`}>
            <Block className={`flcol ${styles.blockWrapper}`}>
                <h1 className={adminStyles.pageTitle}>Пользователи</h1>
            </Block>
        </div>
    );
};

export default UsersAdminTPL;

'use client';

import { PiUserCheck } from 'react-icons/pi';
import { CurrentUserIF } from '@/types/user';
import { getSessionStorageItem } from '@/helpers/storage/storage';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import styles from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.module.scss';
import SendConfirmCodeForm from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.component';

const ConfirmAccountTPL = () => {
    const currentUser = getSessionStorageItem<CurrentUserIF>(
        STORAGE_KEYS.CurrentUser,
    );

    return (
        <AuthLayout>
            <Block className={`flcol ${styles.block}`}>
                <div className={`flc ${styles.title}`}>
                    <PiUserCheck />
                    Подтверждение аккаунта
                </div>
                {currentUser?.isActivated ? (
                    <InfoBlock variant="info">Аккаунт активирован!</InfoBlock>
                ) : (
                    <SendConfirmCodeForm />
                )}
            </Block>
        </AuthLayout>
    );
};

export default ConfirmAccountTPL;

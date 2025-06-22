'use client';

import { PiUserCheck } from 'react-icons/pi';
import { getStorageItem } from '@/helpers/utils';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import styles from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.module.scss';
import SendConfirmCodeForm from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.component';
import { CurrentUserIF } from '@/types/user';

const ConfirmAccountTPL = () => {
    const currentUser = getStorageItem<CurrentUserIF>('currentUser');

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

'use client';

import { FC, useState } from 'react';
import { PiUserCheck } from 'react-icons/pi';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import SendCode from '@/components/form/SendCode/SendCode.component';
import styles from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.module.scss';

const ConfirmAccountTPL: FC = () => {
    const [isCodeSended, setIsCodeSended] = useState<boolean>(false);

    return (
        <AuthLayout>
            <Block className={`flcol ${styles.block}`}>
                <div className={`flc ${styles.title}`}>
                    <PiUserCheck />
                    Подтверждение аккаунта
                </div>
                <SendCode digitsCount={4} />
            </Block>
        </AuthLayout>
    );
};

export default ConfirmAccountTPL;

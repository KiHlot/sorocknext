import { FC } from 'react';
import { PiUserCheck } from 'react-icons/pi';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import styles from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.module.scss';
import SendConfirmCodeForm from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.component';

const ConfirmAccountTPL: FC = () => {
    return (
        <AuthLayout>
            <Block className={`flcol ${styles.block}`}>
                <div className={`flc ${styles.title}`}>
                    <PiUserCheck />
                    Подтверждение аккаунта
                </div>
                <SendConfirmCodeForm />
            </Block>
        </AuthLayout>
    );
};

export default ConfirmAccountTPL;

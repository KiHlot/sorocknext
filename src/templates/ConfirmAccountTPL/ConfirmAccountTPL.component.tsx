import { FC } from 'react';
import { PiUserCheck } from 'react-icons/pi';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import styles from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.module.scss';
import { ConfirmAccountTPLPropsIF } from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.types';
import SendConfirmCodeForm from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';

const ConfirmAccountTPL: FC<ConfirmAccountTPLPropsIF> = ({ profileData }) => {
    return (
        <AuthLayout>
            <Block className={`flcol ${styles.block}`}>
                <div className={`flc ${styles.title}`}>
                    <PiUserCheck />
                    Подтверждение аккаунта
                </div>
                {profileData?.isActivated ? (
                    <InfoBlock variant="info">Аккаунт активирован!</InfoBlock>
                ) : (
                    <SendConfirmCodeForm />
                )}
            </Block>
        </AuthLayout>
    );
};

export default ConfirmAccountTPL;

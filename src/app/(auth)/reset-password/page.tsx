import { ReactElement } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import Block from '@/components/blocks/Block/Block.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm/ResetPasswordForm.component';

export default function LoginPage(): ReactElement {
    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <TbArrowBackUp />
                Сброс пароля
            </div>
            <ResetPasswordForm />
        </Block>
    );
}

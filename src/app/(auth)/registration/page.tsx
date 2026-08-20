import { ReactElement } from 'react';
import { LuUserRoundPlus } from 'react-icons/lu';
import Block from '@/components/blocks/Block/Block.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import RegistrationForm from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.component';

export default function LoginPage(): ReactElement {
    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <LuUserRoundPlus />
                Регистрация
            </div>
            <RegistrationForm />
        </Block>
    );
}

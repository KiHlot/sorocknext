import { ReactElement } from 'react';
import { LuUserRoundPlus } from 'react-icons/lu';
import Block from '@/components/blocks/Block/Block.component';
import RegistrationForm from '@/components/forms/RegistrationForm/RegistrationForm.component';
import authStyles from '@/app/(auth)/auth.module.scss';

export default function LoginPage(): ReactElement {
    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <LuUserRoundPlus />
                <h1>Регистрация</h1>
            </div>
            <RegistrationForm />
        </Block>
    );
}

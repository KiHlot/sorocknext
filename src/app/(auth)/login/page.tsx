import { ReactElement } from 'react';
import { IoEnterOutline } from 'react-icons/io5';
import Block from '@/components/blocks/Block/Block.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import LoginForm from '@/templates/AuthTPL/LoginForm/LoginForm.component';

export default function LoginPage(): ReactElement {
    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <IoEnterOutline />
                Вход
            </div>
            <LoginForm />
        </Block>
    );
}

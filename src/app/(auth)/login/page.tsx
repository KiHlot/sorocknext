import { ReactElement } from 'react';
import { Metadata } from 'next';
import { IoEnterOutline } from 'react-icons/io5';
import Block from '@/components/blocks/Block/Block.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import LoginForm from '@/components/forms/LoginForm/LoginForm.component';

export const metadata: Metadata = {
    title: 'Авторизация на сайт',
    description: 'Вход на сайт',
};

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

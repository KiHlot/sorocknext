'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CurrentUserIF } from '@/types/user';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginUserIF } from '@/api/jwt/types';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import {
    setCookie,
    setSessionStorageItem,
} from '@/helpers/storage/storage.helpers';
import { SUCCESS_CODES } from '@/helpers/validation/codes/codes.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import {
    LOGIN_DELAY,
    schema,
} from '@/templates/AuthTPL/LoginForm/LoginForm.config';

const LoginForm: FC = () => {
    const [loginUser, { isLoading }] = jwtApi.useLoginUserMutation();

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid },
    } = useForm<LoginUserIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: LoginUserIF): Promise<void> => {
        try {
            const result = await loginUser(values).unwrap();

            if (result) {
                reset();

                const { token, expires, currentUser } = result;

                setCookie(STORAGE_KEYS.Token, token, {
                    expires: new Date(expires),
                });
                setSessionStorageItem<CurrentUserIF>(
                    STORAGE_KEYS.CurrentUser,
                    currentUser,
                );

                toast.success(SUCCESS_CODES.s105);

                setTimeout(() => {
                    redirect('/profile');
                }, LOGIN_DELAY);
            }
        } catch {
            console.log('error');
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="username"
                label="Email"
                control={control}
                isRemoveSpaces
                isRequired
            />
            <Input
                name="password"
                label="Пароль"
                control={control}
                type="password"
                isRequired
                isPassword
            />
            <MainButton type="submit" isLoading={isLoading} disabled={!isValid}>
                Вход
            </MainButton>
        </form>
    );
};

export default LoginForm;

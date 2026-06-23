'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CurrentUserIF } from '@/types/user';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginFieldsReqIF } from '@/api/jwt/types';
import { setCookie, setStorageItem } from '@/helpers/utils';
import { schema } from '@/templates/AuthTPL/LoginForm/LoginForm.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { SUCCESS_NOTIFY } from '@/configs/codes';

const LoginForm: FC = () => {
    const [loginUser, { isLoading, data }] = jwtApi.useLoginUserMutation();

    const { handleSubmit, control, reset } = useForm<LoginFieldsReqIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: LoginFieldsReqIF): Promise<void> => {
        await loginUser(values)
            .unwrap()
            .then(({ token, expired, currentUser }) => {
                if (token && expired && currentUser) {
                    setCookie('token', token, {
                        expires: expired,
                    });
                    reset();

                    setStorageItem<CurrentUserIF>(currentUser, 'currentUser');
                    toast.success(SUCCESS_NOTIFY.s105);
                    setTimeout(() => {
                        redirect('/profile');
                    }, 2000);
                }
            });
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
            <MainButton
                type="submit"
                isLoading={isLoading}
                disabled={!!data?.currentUser}
            >
                Вход
            </MainButton>
        </form>
    );
};

export default LoginForm;

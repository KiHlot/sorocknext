'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginFieldsReqIF } from '@/api/jwt/types';
import { setCookie, setStorageItem } from '@/helpers/utils';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { SERVER_ERRORS, SUCCESS_NOTIFY } from '@/configs/codes';
import { schema } from '@/templates/AuthTPL/LoginForm/LoginForm.config';
import { CurrentUserIF } from '@/types/user';

const LoginForm: FC = () => {
    const [loginUser, { isLoading }] = jwtApi.useLoginUserMutation();

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
                } else {
                    toast.error(SERVER_ERRORS.e405);
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
            <MainButton type="submit" isLoading={isLoading}>
                Вход
            </MainButton>
        </form>
    );
};

export default LoginForm;

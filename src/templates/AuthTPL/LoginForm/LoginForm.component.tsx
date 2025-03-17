'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginFieldsReqIF } from '@/api/jwt/types';
import { SERVER_ERRORS } from '@/helpers/codes';
import { setCookie, setStorageItem } from '@/helpers/utils';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import { schema } from '@/templates/AuthTPL/LoginForm/LoginForm.config';
import styles from '@/templates/AuthTPL/LoginForm/LoginForm.module.scss';

const LoginForm: FC = () => {
    const [loginUser, { isLoading, isSuccess }] = jwtApi.useLoginUserMutation();

    const { handleSubmit, control } = useForm<LoginFieldsReqIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: LoginFieldsReqIF): Promise<void> => {
        await loginUser(values)
            .unwrap()
            .then(({ token, expired, profileData }) => {
                if (token && expired && profileData) {
                    setCookie('token', token, {
                        expires: expired,
                    });

                    setStorageItem(profileData, 'profileData');

                    toast.success('Вы успешно авторизовались!');

                    setTimeout(() => {
                        redirect('/profile');
                    }, 2000);
                } else {
                    toast.error(SERVER_ERRORS.e405);
                }
            });
    };

    return (
        <form
            className={`flcol ${styles.loginFormWrapper}`}
            onSubmit={handleSubmit(onSubmit)}
        >
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
                variant="green"
                disabled={isLoading || isSuccess}
                className={styles.button}
            >
                Вход
            </MainButton>
        </form>
    );
};

export default LoginForm;

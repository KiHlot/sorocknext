'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginFieldsReqIF } from '@/api/jwt/types';
import { setCookie } from '@/helpers/utils';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import { schema } from '@/templates/AuthTPL/LoginForm/LoginForm.config';
import styles from '@/templates/AuthTPL/LoginForm/LoginForm.module.scss';

const LoginForm: FC = () => {
    const [loginUser, { isLoading, isSuccess }] = jwtApi.useLoginUserMutation();

    const { handleSubmit, control, reset } = useForm<LoginFieldsReqIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: LoginFieldsReqIF): Promise<void> => {
        await loginUser(values)
            .unwrap()
            .then(({ token, expired }) => {
                if (token && expired) {
                    setCookie('token', token, {
                        expires: expired,
                    });
                    reset();
                    toast.success('Вы успешно авторизовались!');

                    setTimeout(() => {
                        //TODO href
                        window.location.href = '';
                    }, 2000);
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
                variant="light"
                disabled={isLoading || isSuccess}
                className={styles.button}
            >
                Вход
            </MainButton>
        </form>
    );
};

export default LoginForm;

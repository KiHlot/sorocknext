'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CurrentUserIF } from '@/types/user';
import { jwtApi } from '@/api/jwt/jwt';
import { LoginUserIF } from '@/api/jwt/types';
import { usersApi } from '@/api/users/users';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import {
    deleteCookie,
    setCookie,
    setSessionStorageItem,
} from '@/helpers/storage/storage.helpers';
import {
    ERRORS_CODES,
    SERVER_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import Button from '@/components/controls/Button/Button.component';
import { Input } from '@/components/controls/Input/Input.component';
import { schema } from '@/components/forms/LoginForm/LoginForm.config';

const LoginForm: FC = () => {
    const router = useRouter();

    const [loginUser, { isLoading: isLoginLoading }] =
        jwtApi.useLoginUserMutation();
    const [fetchCurrentUser, { isFetching: isCurrentUserLoading }] =
        usersApi.useLazyGetCurrentUserQuery();

    const isLoading = isLoginLoading || isCurrentUserLoading;

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid },
        setError,
    } = useForm<LoginUserIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: LoginUserIF): Promise<void> => {
        let isTokenSet = false;

        try {
            const result = await loginUser(values).unwrap();

            if (!result?.token) {
                toast.error(ERRORS_CODES.er900);
                return;
            }

            reset();

            const { token, expires } = result;

            setCookie(STORAGE_KEYS.Token, token, {
                expires: new Date(expires),
            });
            isTokenSet = true;

            const currentUserResponse = await fetchCurrentUser().unwrap();

            parseResponse(currentUserResponse, ({ data, errors }) => {
                if (errors?.length || !data) {
                    deleteCookie(STORAGE_KEYS.Token);
                    const code = errors?.[0]?.code;
                    toast.error(
                        (code && ERRORS_CODES[code]) || ERRORS_CODES.er900,
                    );
                    return;
                }

                setSessionStorageItem<CurrentUserIF>(
                    STORAGE_KEYS.CurrentUser,
                    data,
                );
                toast.success(SUCCESS_CODES.s105);
                setTimeout(() => router.push('/'), MAGIC_NUMBERS.RedirectDelay);
            });
        } catch (error) {
            if (isTokenSet) {
                deleteCookie(STORAGE_KEYS.Token);
            }

            const { status, message } = catchError(error);

            if (status === SERVER_CODES.C403) {
                setError('username', {
                    type: 'manual',
                    message: ERRORS_CODES.er209,
                });

                return;
            }

            toast.error(message || ERRORS_CODES.er900);
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="username"
                label="Email"
                control={control}
                isDisabled={isLoading}
                isRemoveSpaces
                isRequired
            />
            <Input
                name="password"
                label="Пароль"
                control={control}
                type="password"
                isDisabled={isLoading}
                isRequired
                isPassword
            />
            <Button
                type="submit"
                isLoading={isLoading}
                disabled={!isValid}
                dataTest="login_form_submit"
            >
                Вход
            </Button>
        </form>
    );
};

export default LoginForm;

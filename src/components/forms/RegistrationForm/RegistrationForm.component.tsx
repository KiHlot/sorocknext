'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { RegistrationFieldsIF } from '@/api/auth/types';
import { MAGIC_NUMBERS } from '@/configs/config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { schema } from '@/components/forms/RegistrationForm/RegistrationForm.config';

const RegistrationForm: FC = () => {
    const router = useRouter();

    const [registerUser, { isLoading }] = authApi.useRegisterUserMutation();

    const {
        handleSubmit,
        control,
        setError,
        reset,
        formState: { isValid },
    } = useForm<RegistrationFieldsIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: RegistrationFieldsIF): Promise<void> => {
        try {
            const result = await registerUser(values).unwrap();

            parseResponse(result, ({ errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName && code) {
                            setError(fieldName as keyof RegistrationFieldsIF, {
                                type: 'manual',
                                message: ERRORS_CODES[code],
                            });
                        }
                    }

                    return;
                }

                reset();
                toast.success(SUCCESS_CODES.s104);
                setTimeout(
                    () => router.push('/login'),
                    MAGIC_NUMBERS.RedirectDelay,
                );
            });
        } catch (error) {
            const { message } = catchError(error);
            toast.error(message);
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                label="Имя"
                control={control}
                isTextsOnly
                maxLength={VALIDATOR_FIELD.name.maxLength}
                isDisabled={isLoading}
                isRemoveSpaces
            />
            <Input
                name="surname"
                label="Фамилия"
                control={control}
                isTextsOnly
                maxLength={VALIDATOR_FIELD.surname.maxLength}
                isDisabled={isLoading}
                isRemoveSpaces
            />
            <Input
                name="loginEmail"
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
            <Input
                name="passwordConfirm"
                label="Подтверждение пароля"
                control={control}
                type="password"
                isDisabled={isLoading}
                isRequired
                isPassword
            />
            <MainButton type="submit" isLoading={isLoading} disabled={!isValid}>
                Регистрация
            </MainButton>
        </form>
    );
};

export default RegistrationForm;

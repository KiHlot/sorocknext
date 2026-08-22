'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { RegistrationFieldsIF } from '@/api/auth/types';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import { SUCCESS_CODES } from '@/helpers/validation/codes/codes.config';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { schema } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.config';
import { FieldsNames } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.types';

const RegistrationForm: FC = () => {
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
        const result = await registerUser(values).unwrap();

        parseResponse(result, ({ data, errors }) => {
            reset();
            toast.success(SUCCESS_CODES.s104);
            setTimeout(() => redirect('/auth'), 2000);
        });
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                label="Имя"
                control={control}
                isTextsOnly
                maxLength={30}
                isRemoveSpaces
            />
            <Input
                name="surname"
                label="Фамилия"
                control={control}
                isTextsOnly
                maxLength={30}
                isRemoveSpaces
            />
            <Input
                name="loginEmail"
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
            <Input
                name="passwordConfirm"
                label="Подтверждение пароля"
                control={control}
                type="password"
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

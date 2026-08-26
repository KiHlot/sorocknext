'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CurrentUserIF } from '@/types/user';
import { authApi } from '@/api/auth/auth';
import { ResetPasswordIF } from '@/api/auth/types';
import { SUCCESS_NOTIFY } from '@/helpers/validation/validation.config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    getSessionStorageItem,
    setSessionStorageItem,
} from '@/helpers/storage/storage.helpers';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import CodeInput from '@/components/controls/CodeInput/CodeInput.component';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import {
    INPUT_NAMES,
    schema,
} from '@/components/forms/ResetPasswordForm/ResetPasswordForm.config';
import { FieldsNames } from '@/components/forms/ResetPasswordForm/ResetPasswordForm.types';

const ResetPasswordForm: FC = () => {
    const [resetPassword, { isLoading, data }] =
        authApi.useResetPasswordMutation();

    const {
        handleSubmit,
        control,
        reset,
        setError,
        setValue,
        clearErrors,
        watch,
    } = useForm<ResetPasswordIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const confirmCode = watch('confirmCode');

    const onSubmit = async (values: ResetPasswordIF): Promise<void> => {
        await resetPassword(values)
            .unwrap()
            .then((result) => {
                parseResponse<FieldsNames>(
                    result,
                    () => {
                        reset();
                        const storageData =
                            getSessionStorageItem<CurrentUserIF>(
                                STORAGE_KEYS.CurrentUser,
                            );

                        if (storageData) {
                            setSessionStorageItem<CurrentUserIF>(
                                STORAGE_KEYS.CurrentUser,
                                {
                                    ...storageData,
                                    isActivated: true,
                                },
                            );
                        }

                        toast.success(SUCCESS_NOTIFY.s101);
                        redirect('/auth');
                    },
                    setError,
                );
            });
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock title="Ввод нового пароля" variant="info">
                Для обеспечения безопасности вашего аккаунта, вам необходимо
                создать новый пароль. Убедитесь, что он соответствует следующим
                требованиям:
                <br />- Длина пароля должна составлять не менее 8 символов.
                <br />- Пароль должен содержать как минимум одну заглавную
                букву.
                <br />- Используйте цифры и специальные символы для повышения
                надежности.
                <br />
                <br />
                Для подтверждения введите электронную почту, указанную при
                регистрации, код, который был выслан на почту и новый пароль
                дважды.
            </InfoBlock>
            <CodeInput
                names={INPUT_NAMES}
                name="confirmCode"
                control={control}
                clearErrors={clearErrors}
                setValue={(name, code) => setValue(name, code)}
                isDisabled={isLoading || !!data}
            />
            <Input name="email" label="Email" control={control} isRequired />
            <Input
                name="password"
                label="Новый пароль"
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
            <MainButton
                type="submit"
                isLoading={isLoading}
                disabled={
                    isLoading ||
                    confirmCode?.length !== INPUT_NAMES.length ||
                    !!data
                }
            >
                Изменить
            </MainButton>
        </form>
    );
};

export default ResetPasswordForm;

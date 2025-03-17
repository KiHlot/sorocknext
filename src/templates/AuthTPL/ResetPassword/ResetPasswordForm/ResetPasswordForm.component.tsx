'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/auth/auth';
import { ResetPasswordIF } from '@/api/auth/types';
import { SUCCESS_NOTIFY } from '@/helpers/codes';
import { getStorageItem, setStorageItem } from '@/helpers/utils';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import CodeInput from '@/components/form/CodeInput/CodeInput.component';
import { Input } from '@/components/form/Input/Input.component';
import {
    INPUT_NAMES,
    schema,
} from '@/templates/AuthTPL/ResetPassword/ResetPasswordForm/ResetPasswordForm.config';
import styles from '@/templates/AuthTPL/ResetPassword/ResetPasswordForm/ResetPasswordForm.module.scss';
import { FieldsNames } from '@/templates/AuthTPL/ResetPassword/ResetPasswordForm/ResetPasswordForm.types';
import { ProfileIF } from '@/types/user';

const ResetPasswordForm: FC = () => {
    const [resetPassword, { isLoading, isSuccess }] =
        authApi.useResetPasswordMutation();

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

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
            .then(result => {
                parseResponse<FieldsNames>(
                    result,
                    () => {
                        reset();
                        setStorageItem(
                            {
                                ...getStorageItem<ProfileIF>('profileData'),
                                isActivated: true,
                            },
                            'profileData',
                        );
                        toast.success(SUCCESS_NOTIFY.s101);
                        redirect('/auth');
                    },
                    setError,
                );
            });
    };

    useEffect(() => {
        setIsDisabled(
            isLoading || confirmCode?.length !== INPUT_NAMES.length || isSuccess,
        );
    }, [confirmCode, isLoading, isSuccess]);

    return (
        <form
            className={`flcol ${styles.resetPasswordFormWrapper}`}
            onSubmit={handleSubmit(onSubmit)}
        >
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
                isDisabled={isLoading}
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
                variant="green"
                className={styles.button}
                disabled={isDisabled}
            >
                Изменить
            </MainButton>
        </form>
    );
};

export default ResetPasswordForm;

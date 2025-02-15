'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/authApi/authApi';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import { schema } from '@/templates/AuthTPL/ResetPasswordForm/ResetPasswordForm.config';
import styles from '@/templates/AuthTPL/ResetPasswordForm/ResetPasswordForm.module.scss';
import {
    FieldsNames,
    ResetPasswordFormIF,
    ResetPasswordFormPropsIF,
} from '@/templates/AuthTPL/ResetPasswordForm/ResetPasswordForm.types';

const ResetPasswordForm: FC<ResetPasswordFormPropsIF> = ({ creeds }) => {
    const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();

    const [isSent, setIsSent] = useState<boolean>(false);

    const { handleSubmit, control, reset, setError } =
        useForm<ResetPasswordFormIF>({
            mode: 'onSubmit',
            resolver: yupResolver(schema),
        });

    const onSubmit = async (values: ResetPasswordFormIF): Promise<void> => {
        await resetPassword({
            ...values,
            ...creeds,
        })
            .unwrap()
            .then(result => {
                parseResponse<FieldsNames, null>(
                    result,
                    () => {
                        reset();
                        setIsSent(true);
                        // logout('?type=pass_reset_completed');
                    },
                    setError,
                );
            });
    };

    return (
        <form
            className={`flcol ${styles.resetPasswordFormWrapper}`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <InfoBlock title="Ввод нового пароля" variant="info" className={styles.infoBlock}>
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
                Пожалуйста, введите новый пароль дважды для подтверждения, чтобы
                избежать возможных ошибок. После ввода пароля нажмите кнопку
                «Сохранить».
            </InfoBlock>
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
                variant="light"
                className={styles.button}
                disabled={isLoading || isSent}
            >
                Сохранить
            </MainButton>
        </form>
    );
};

export default ResetPasswordForm;

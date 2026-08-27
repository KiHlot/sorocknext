'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { MAGIC_NUMBERS } from '@/configs/config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import CodeInput from '@/components/controls/CodeInput/CodeInput.component';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import {
    INPUT_NAMES,
    schema,
} from '@/components/widgets/ResetPasswordWidget/ResetPasswordForm/ResetPasswordForm.config';
import {
    ResetPasswordFormIF,
    ResetPasswordFormPropsIF,
} from '@/components/widgets/ResetPasswordWidget/ResetPasswordForm/ResetPasswordForm.types';

const ResetPasswordForm: FC<ResetPasswordFormPropsIF> = ({ email }) => {
    const router = useRouter();

    const [resetPassword, { isLoading }] = authApi.useResetPasswordMutation();

    const {
        handleSubmit,
        control,
        reset,
        setError,
        formState: { isValid },
    } = useForm<ResetPasswordFormIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: ResetPasswordFormIF): Promise<void> => {
        try {
            const result = await resetPassword({ ...values, email }).unwrap();

            parseResponse(result, ({ errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName && code) {
                            setError(fieldName as keyof ResetPasswordFormIF, {
                                type: 'manual',
                                message: ERRORS_CODES[code],
                            });
                        }
                    }

                    return;
                }

                reset();
                toast.success(SUCCESS_CODES.s101);
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
                label="Введите код полученный по email"
                names={INPUT_NAMES}
                name="confirmCode"
                control={control}
                isDisabled={isLoading}
                isRequired
            />
            <Input
                name="password"
                label="Новый пароль"
                control={control}
                type="password"
                isRequired
                isPassword
                isDisabled={isLoading}
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
                Изменить
            </MainButton>
        </form>
    );
};

export default ResetPasswordForm;

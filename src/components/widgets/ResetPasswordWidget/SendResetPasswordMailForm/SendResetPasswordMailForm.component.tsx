'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { SendResetPasswordCodeMailIF } from '@/api/auth/types';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import { schema } from '@/components/widgets/ResetPasswordWidget/SendResetPasswordMailForm/SendResetPasswordMailForm.config';
import { SendResetPasswordMailFormPropsIF } from '@/components/widgets/ResetPasswordWidget/SendResetPasswordMailForm/SendResetPasswordMailForm.types';

const SendResetPasswordMailForm: FC<SendResetPasswordMailFormPropsIF> = ({
    nextStepHandler,
}) => {
    const [sendResetPasswordCodeMail, { isLoading }] =
        authApi.useSendResetPasswordCodeMailMutation();

    const {
        handleSubmit,
        control,
        setError,
        reset,
        formState: { isValid },
    } = useForm<SendResetPasswordCodeMailIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (
        values: SendResetPasswordCodeMailIF,
    ): Promise<void> => {
        try {
            const result = await sendResetPasswordCodeMail(values).unwrap();

            parseResponse(result, ({ errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName && code) {
                            setError(
                                fieldName as keyof SendResetPasswordCodeMailIF,
                                {
                                    type: 'manual',
                                    message: ERRORS_CODES[code],
                                },
                            );
                        }
                    }

                    return;
                }

                toast.success(SUCCESS_CODES.s102);
                reset();
                nextStepHandler(values.email);
            });
        } catch (error) {
            const { message } = catchError(error);
            toast.error(message);
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock title="Отправка проверочного кода" variant="info">
                Введите email который вы указали при регистрации, мы вышлем
                проверочный код
            </InfoBlock>
            <Input
                name="email"
                label="Email"
                control={control}
                isRequired
                isDisabled={isLoading}
            />
            <MainButton type="submit" disabled={!isValid} isLoading={isLoading}>
                Отправить
            </MainButton>
        </form>
    );
};

export default SendResetPasswordMailForm;

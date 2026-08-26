'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IoCheckmark } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { SendConfirmCodeMailIF } from '@/api/auth/types';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { schema } from '@/components/widgets/ConfirmAccountWidget/SendConfirmCodeForm/SendConfirmCodeForm.config';

const SendConfirmCodeForm: FC = () => {
    const [sendConfirmCodeMail, { isLoading, isSuccess }] =
        authApi.useSendConfirmCodeMailMutation();

    const {
        handleSubmit,
        control,
        formState: { isValid },
        setError,
    } = useForm<SendConfirmCodeMailIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: SendConfirmCodeMailIF): Promise<void> => {
        try {
            const result = await sendConfirmCodeMail(values).unwrap();

            parseResponse(result, ({ errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName && code) {
                            setError(fieldName as keyof SendConfirmCodeMailIF, {
                                type: 'manual',
                                message: ERRORS_CODES[code],
                            });
                        }
                    }

                    toast.success(SUCCESS_CODES.s102);
                    return;
                }
            });
        } catch (error) {
            const { message } = catchError(error);
            toast.error(message);
        }
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="email"
                label="Email"
                control={control}
                isRemoveSpaces
                isRequired
                isDisabled={isSuccess}
            />
            <MainButton
                type="submit"
                icon={<IoCheckmark />}
                isLoading={isLoading}
                disabled={!isValid || isSuccess}
            >
                Отправить ссылку
            </MainButton>
        </form>
    );
};

export default SendConfirmCodeForm;

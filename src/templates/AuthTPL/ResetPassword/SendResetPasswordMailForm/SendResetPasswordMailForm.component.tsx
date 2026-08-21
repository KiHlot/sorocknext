import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authApi } from '@/api/auth/auth';
import { SUCCESS_NOTIFY } from '@/helpers/validation/validation.config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import { schema } from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.config';
import {
    FieldsNames,
    SendResetPasswordMailFormPropsIF,
} from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.types';

const SendResetPasswordMailForm: FC<SendResetPasswordMailFormPropsIF> = ({
    callback,
}) => {
    const [sendResetPasswordCodeMail, { isLoading, data }] =
        authApi.useSendResetPasswordCodeMailMutation();

    const { handleSubmit, control, setError, reset } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ email }: { email: string }): Promise<void> => {
        await sendResetPasswordCodeMail(email)
            .unwrap()
            .then((data) => {
                parseResponse<FieldsNames>(
                    data,
                    () => {
                        reset();
                        toast.success(SUCCESS_NOTIFY.s102);
                        callback();
                    },
                    setError,
                );
            });
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock title="Отправка проверочного кода" variant="info">
                Введите email который вы указали при регистрации, мы вышлем
                проверочный код
            </InfoBlock>
            <Input name="email" label="Email" control={control} isRequired />
            <MainButton type="submit" disabled={!!data} isLoading={isLoading}>
                Отправить
            </MainButton>
        </form>
    );
};

export default SendResetPasswordMailForm;

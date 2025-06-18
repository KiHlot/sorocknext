import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/auth/auth';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import { SUCCESS_NOTIFY } from '@/configs/codes';
import { schema } from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.config';
import styles from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.module.scss';
import {
    FieldsNames,
    SendResetPasswordMailFormPropsIF,
} from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.types';

const SendResetPasswordMailForm: FC<SendResetPasswordMailFormPropsIF> = ({
    callback,
}) => {
    const [sendResetPasswordCodeMail, { isLoading, isSuccess }] =
        authApi.useSendResetPasswordCodeMailMutation();

    const { handleSubmit, control, setError, reset } = useForm<{
        email: string;
    }>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async ({ email }: { email: string }): Promise<void> => {
        await sendResetPasswordCodeMail(email)
            .unwrap()
            .then(data => {
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
        <form className="flcol gap" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock title="Отправка проверочного кода" variant="info">
                Введите email который вы указали при регистрации, мы вышлем
                проверочный код
            </InfoBlock>
            <Input name="email" label="Email" control={control} isRequired />
            <MainButton
                type="submit"
                variant="green"
                className={styles.button}
                disabled={isLoading || isSuccess}
            >
                Отправить
            </MainButton>
        </form>
    );
};

export default SendResetPasswordMailForm;

import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/auth/auth';
import { SUCCESS_NOTIFY } from '@/helpers/codes';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import { schema } from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.config';
import styles from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.module.scss';
import {
    FieldsNames,
    SendResetPasswordMailFormPropsIF,
} from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.types';

const SendResetPasswordMailForm: FC<SendResetPasswordMailFormPropsIF> = ({
    className = '',
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
                parseResponse<FieldsNames, void>(
                    data,
                    () => {
                        reset();
                        toast.success(SUCCESS_NOTIFY.s102);
                        setTimeout(() => {
                            return redirect('/auth');
                        }, 2000);
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

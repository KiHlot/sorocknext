import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { authApi } from '@/api/auth/auth';
import { RegistrationFieldsReqIF } from '@/api/auth/types';
import { schema } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.config';
import { FieldsNames } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.types';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { SUCCESS_NOTIFY } from '@/configs/codes';
import { parseResponse } from '@/store/functions';

const RegistrationForm: FC = () => {
    const [registerUser, { isLoading, data }] =
        authApi.useRegisterUserMutation();

    const { handleSubmit, control, setError, reset } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: RegistrationFieldsReqIF): Promise<void> => {
        await registerUser(values)
            .unwrap()
            .then(data => {
                parseResponse<FieldsNames>(
                    data,
                    () => {
                        reset();
                        toast.success(SUCCESS_NOTIFY.s104);
                        setTimeout(() => redirect('/auth'), 2000);
                    },
                    setError,
                );
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

            <MainButton
                type="submit"
                isLoading={isLoading}
                disabled={!!data?.data}
            >
                Регистрация
            </MainButton>
        </form>
    );
};

export default RegistrationForm;

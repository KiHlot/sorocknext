import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { toast } from '~/react-toastify';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/authApi/authApi';
import { RegistrationFieldsReqIF } from '@/api/authApi/types';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import { schema } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.config';
import styles from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.module.scss';
import { FieldsNames } from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.types';

const RegistrationForm: FC = () => {
    const [registerUser, { isLoading, isSuccess }] =
        authApi.useRegisterUserMutation();

    const { handleSubmit, control, setError, reset } =
        useForm<RegistrationFieldsReqIF>({
            mode: 'onSubmit',
            resolver: yupResolver(schema),
        });

    const onSubmit = async (values: RegistrationFieldsReqIF): Promise<void> => {
        await registerUser(values)
            .unwrap()
            .then(data => {
                parseResponse<FieldsNames, void>(
                    data,
                    () => {
                        reset();
                        toast.success(
                            'Вы успешно зарегистрировались! Войдите в аккаунт, используя электронную почту и пароль, указанные при регистрации.',
                        );
                        setTimeout(() => {
                            window.location.href = '/auth';
                        }, 2000);
                    },
                    setError,
                );
            });
    };

    return (
        <form
            className={`flcol ${styles.registrationFormWrapper}`}
            onSubmit={handleSubmit(onSubmit)}
        >
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
                disabled={isLoading || isSuccess}
                variant="light"
                className={styles.button}
            >
                Регистрация
            </MainButton>
        </form>
    );
};

export default RegistrationForm;

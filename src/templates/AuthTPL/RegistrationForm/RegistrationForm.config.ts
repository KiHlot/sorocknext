import * as yup from 'yup';
import { ERRORS } from '@/helpers/errors';
import { VALIDATORS } from '@/helpers/validator';

export const schema = yup.object().shape({
    name: yup
        .string()
        .required(ERRORS.er200)
        .min(
            VALIDATORS.name.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.name.minLength}`,
        )
        .max(
            VALIDATORS.name.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.name.maxLength}`,
        ),
    surname: yup
        .string()
        .required(ERRORS.er200)
        .min(
            VALIDATORS.surname.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.name.minLength}`,
        )
        .max(
            VALIDATORS.surname.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.name.maxLength}`,
        ),
    loginEmail: yup
        .string()
        .required(ERRORS.er200)
        .email(ERRORS.er203)
        .min(
            VALIDATORS.email.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.email.minLength}`,
        )
        .max(
            VALIDATORS.email.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.email.maxLength}`,
        ),
    password: yup
        .string()
        .required(ERRORS.er200)
        .matches(
            /^[a-zA-Z0-9!@#$%^()&*_-]+$/,
            `${ERRORS.er206}. Допустимы латинские буквы, цифры а так же символы !@#$%^()&*_-`,
        )
        .min(
            VALIDATORS.password.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.password.minLength}`,
        )
        .max(
            VALIDATORS.password.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.password.maxLength}`,
        ),
    passwordConfirm: yup
        .string()
        .required(ERRORS.er200)
        .matches(
            /^[a-zA-Z0-9!@#$%^()&*_-]+$/,
            `${ERRORS.er206}. Допустимы латинские буквы, цифры а так же символы !@#$%^()&*_-`,
        )
        .min(
            VALIDATORS.password.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.password.minLength}`,
        )
        .max(
            VALIDATORS.password.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.password.maxLength}`,
        )
        .oneOf([yup.ref('password')], ERRORS.er204),
});

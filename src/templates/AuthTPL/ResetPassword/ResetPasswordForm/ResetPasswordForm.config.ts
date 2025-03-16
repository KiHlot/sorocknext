import * as yup from 'yup';
import { ERRORS } from '@/helpers/codes';
import { VALIDATORS } from '@/helpers/validator';

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema = yup.object().shape({
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
    email: yup
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
    confirmCode: yup
        .string()
        .required(ERRORS.er200)
        .length(INPUT_NAMES.length, `Введите ${INPUT_NAMES.length} символов!`),
});

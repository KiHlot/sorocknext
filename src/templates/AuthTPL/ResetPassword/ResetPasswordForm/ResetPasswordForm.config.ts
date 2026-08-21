import * as yup from 'yup';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema = yup.object().shape({
    password: yup
        .string()
        .required(ERRORS_CODES.er200)
        .matches(
            /^[a-zA-Z0-9!@#$%^()&*_-]+$/,
            `${ERRORS_CODES.er206}. Допустимы латинские буквы, цифры а так же символы !@#$%^()&*_-`,
        )
        .min(
            VALIDATOR_FIELD.password.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.password.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.password.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.password.maxLength}`,
        ),
    passwordConfirm: yup
        .string()
        .required(ERRORS_CODES.er200)
        .matches(
            /^[a-zA-Z0-9!@#$%^()&*_-]+$/,
            `${ERRORS_CODES.er206}. Допустимы латинские буквы, цифры а так же символы !@#$%^()&*_-`,
        )
        .min(
            VALIDATOR_FIELD.password.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.password.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.password.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.password.maxLength}`,
        )
        .oneOf([yup.ref('password')], ERRORS_CODES.er204),
    email: yup
        .string()
        .required(ERRORS_CODES.er200)
        .email(ERRORS_CODES.er203)
        .min(
            VALIDATOR_FIELD.email.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.email.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.email.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.email.maxLength}`,
        ),
    confirmCode: yup
        .string()
        .required(ERRORS_CODES.er200)
        .length(INPUT_NAMES.length, `Введите ${INPUT_NAMES.length} цифр!`),
});

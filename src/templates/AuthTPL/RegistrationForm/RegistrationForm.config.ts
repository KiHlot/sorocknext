import * as yup from 'yup';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.helpers';
import { ERRORS } from '@/helpers/validation/validation.config';

export const schema = yup.object().shape({
    name: yup
        .string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.name.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.name.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.name.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.name.maxLength}`,
        ),
    surname: yup
        .string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.surname.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.name.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.surname.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.name.maxLength}`,
        ),
    loginEmail: yup
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
});

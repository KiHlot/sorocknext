import * as yup from 'yup';
import { ERRORS } from '@/helpers/codes';
import { VALIDATORS } from '@/helpers/validator';

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
});

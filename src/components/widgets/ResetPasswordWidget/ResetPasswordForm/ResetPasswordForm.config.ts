import * as yup from 'yup';
import { object, ObjectSchema, string } from 'yup';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { ResetPasswordFormIF } from '@/components/widgets/ResetPasswordWidget/ResetPasswordForm/ResetPasswordForm.types';

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema: ObjectSchema<ResetPasswordFormIF> = object({
    password: string()
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
    passwordConfirm: string()
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
    confirmCode: string()
        .required(ERRORS_CODES.er200)
        .length(INPUT_NAMES.length, `Введите ${INPUT_NAMES.length} цифр!`),
});

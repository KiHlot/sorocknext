import { object, ObjectSchema, string } from 'yup';
import { LoginUserIF } from '@/api/jwt/types';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';

export const schema: ObjectSchema<LoginUserIF> = object({
    username: string()
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
    password: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.password.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.password.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.password.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.password.maxLength}`,
        ),
});

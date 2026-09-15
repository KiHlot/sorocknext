import { object, ObjectSchema, string } from 'yup';
import { ContactFormIF } from '@/api/site/types';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';

export const schema: ObjectSchema<ContactFormIF> = object({
    email: string()
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
    name: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.name.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.name.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.name.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.name.maxLength}`,
        ),
    message: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.message.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.message.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.message.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.message.maxLength}`,
        ),
});

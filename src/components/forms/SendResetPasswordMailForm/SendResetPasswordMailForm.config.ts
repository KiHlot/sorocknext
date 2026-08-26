import * as yup from 'yup';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.helpers';
import { ERRORS } from '@/helpers/validation/validation.config';

export const schema = yup.object().shape({
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
});

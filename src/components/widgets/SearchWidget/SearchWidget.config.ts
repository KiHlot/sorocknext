import { array, object, ObjectSchema, string } from 'yup';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { SearchWidgetFormIF } from '@/components/widgets/SearchWidget/SearchWidget.types';

export const schema: ObjectSchema<SearchWidgetFormIF> = object({
    phrase: string()
        .required(ERRORS_CODES.er200)
        .min(
            VALIDATOR_FIELD.phrase.minLength,
            `${ERRORS_CODES.er201}. Мин: ${VALIDATOR_FIELD.phrase.minLength}`,
        )
        .max(
            VALIDATOR_FIELD.phrase.maxLength,
            `${ERRORS_CODES.er202}. Макс: ${VALIDATOR_FIELD.phrase.maxLength}`,
        ),
    postTypes: array().optional(),
    categories: array().optional(),
});

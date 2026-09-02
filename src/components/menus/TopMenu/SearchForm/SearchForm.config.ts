import { object, ObjectSchema, string } from 'yup';
import { ERRORS_CODES } from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { SearchFormIF } from '@/components/menus/TopMenu/SearchForm/SearchForm.types';

export const schema: ObjectSchema<SearchFormIF> = object({
    phrase: string()
        .required(ERRORS_CODES.er200)
        .min(VALIDATOR_FIELD.phrase.minLength, ERRORS_CODES.er201)
        .max(VALIDATOR_FIELD.phrase.maxLength, ERRORS_CODES.er202),
});

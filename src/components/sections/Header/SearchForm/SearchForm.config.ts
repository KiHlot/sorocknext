import { object, ObjectSchema, string } from 'yup';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import { SearchFormIF } from '@/components/sections/Header/SearchForm/SearchForm.types';

export const schema: ObjectSchema<SearchFormIF> = object({
    phrase: string()
        .required('Заполни')
        .min(
            VALIDATOR_FIELD.phrase.minLength,
            `Мин. ${VALIDATOR_FIELD.phrase.minLength} символа`,
        )
        .max(
            VALIDATOR_FIELD.phrase.maxLength,
            `Макс. ${VALIDATOR_FIELD.phrase.maxLength} символов`,
        ),
});

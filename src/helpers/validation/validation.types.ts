import { ValueOf } from '@/types/common';
import {
    VALIDATOR_FIELDS,
    VALIDATOR_FILES,
} from '@/helpers/validation/validation.config';

export type ValidatorFieldT = Record<
    ValueOf<typeof VALIDATOR_FIELDS>,
    ValidatorFieldConfigIF
>;

export type ValidatorFileT = Record<
    ValueOf<typeof VALIDATOR_FILES>,
    ValidatorFileConfigIF
>;

interface ValidatorFieldConfigIF {
    minLength: number;
    maxLength: number;
}

interface ValidatorFileConfigIF {
    accept: string[];
    maxSize: number;
}

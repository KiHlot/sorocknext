import { ValueOf } from '@/types/common';
import {
    SERVER_CODES,
    SERVER_ERRORS,
} from '@/helpers/validation/codes/codes.config';
import { VALIDATOR_FIELDS } from '@/helpers/validation/validation.config';

export interface ServerErrorsT {
    className?: string;
}

export type ServerErrorT = Record<ValueOf<typeof SERVER_CODES>, string>;

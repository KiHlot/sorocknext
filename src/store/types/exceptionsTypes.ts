import { ElemNamesType } from "@/helpers/validate/validate";

export type ExceptionType = {
  erCode: string;
  elemName: ElemNamesType;
};

export type ExceptionsReducerType = {
  exceptions: ExceptionType[] | null;
};

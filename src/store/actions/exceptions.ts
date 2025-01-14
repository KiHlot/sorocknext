import { AppDispatch } from "@/store";
import { ExceptionType } from "@/store/types/exceptionsTypes";

export const setExceptions = (
  dispatch: AppDispatch,
  data: ExceptionType[] | null,
) => {
  dispatch({
    type: "SET_EXCEPTIONS",
    data: data,
  });
};

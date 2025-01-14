import { AnyAction, Reducer } from "redux";
import { ExceptionsReducerType } from "../types/exceptionsTypes";

const initialState: ExceptionsReducerType = {
  exceptions: null,
};

export const exceptionsReducer: Reducer<ExceptionsReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "SET_EXCEPTIONS":
      return {
        ...state,
        exceptions: action.data,
      };

    default:
      return state;
  }
};

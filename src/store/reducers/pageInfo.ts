import { AnyAction, Reducer } from "redux";
import { PageInfoReducerType } from "../types/pageInfoTypes";

const initialState: PageInfoReducerType = {
  postType: null,
  isDataDisabled: false,
  comments: null,
};

export const pageInfoReducer: Reducer<PageInfoReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "UPDATE_POST_TYPE":
      return {
        ...state,
        postType: action.data,
      };
    case "UPDATE_IS_DATA_DISABLED":
      return {
        ...state,
        isDataDisabled: action.data,
      };

    case "UPDATE_COMMENTS":
      return {
        ...state,
        comments: action.data,
      };

    default:
      return state;
  }
};

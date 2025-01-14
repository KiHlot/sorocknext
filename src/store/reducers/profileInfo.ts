import { AnyAction, Reducer } from "redux";
import { ProfileInfoReducerType } from "../types/profileInfoTypes";

const initialState: ProfileInfoReducerType = {
  profileChartsData: null,
  pageOwnerId: null,
  isPageOwner: false,
  pageOwnerMetric: null,
  userAwardsList: null,
  pageOwnerSubscribeData: null,
  profileActivity: null,
  rateCommentsData: null,
  rateCommentsPagesCount: null,
  rateData: null,
};

export const profileInfoReducer: Reducer<ProfileInfoReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "UPDATE_PROFILE_CHARTS_DATA":
      return {
        ...state,
        profileChartsData: action.data,
      };

    case "SET_PAGE_OWNER_ID":
      return {
        ...state,
        pageOwnerId: action.data,
      };

    case "SET_IS_PAGE_OWNER":
      return {
        ...state,
        isPageOwner: action.data,
      };

    case "SET_PAGE_OWNER_METRIC":
      return {
        ...state,
        pageOwnerMetric: action.data,
      };

    case "UPDATE_PROFILE_ACTIVITY":
      return {
        ...state,
        profileActivity: action.data,
      };

    case "SET_PAGE_OWNER_SUBSCRIBE_DATA":
      return {
        ...state,
        pageOwnerSubscribeData: action.data,
      };

    case "SET_AWARDS_LIST":
      return {
        ...state,
        userAwardsList: action.data,
      };

    case "UPDATE_RATE_COMMENTS_DATA":
      return {
        ...state,
        rateCommentsData: action.data,
      };

    case "UPDATE_RATE_COMMENTS_PAGES":
      return {
        ...state,
        rateCommentsPagesCount: action.data,
      };

    case "UPDATE_RATE_DATA":
      return {
        ...state,
        rateData: action.data,
      };

    default:
      return state;
  }
};

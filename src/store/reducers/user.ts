import { AnyAction, Reducer } from "redux";
import { UserReducerType } from "@/store/types/userTypes";

const initialState: UserReducerType = {
  isUserDataFetched: false,
  userData: null,
  isLogined: false,
  userLikesData: {
    countToday: 0,
    userLikedPosts: [],
    count30: 0,
  },
  userCommentsData: {
    count30: 0,
    countToday: 0,
  },
  userPostsData: {
    count30: 0,
    countToday: 0,
  },
  userViewsData: {
    countToday: 0,
    count30: 0,
  },
  isPolicyAcepted: false,
  userBookedData: {
    userBookedPosts: [],
  },
  userSubsData: null,
  userShowedBookmarkItemsCount: 10,
  userBookmarkFeed: null,
};

export const userReducer: Reducer<UserReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.data,
      };
    case "SET_IS_LOGINED":
      return {
        ...state,
        isLogined: action.data,
      };
    case "UPDATE_USER_VIEWS_DATA":
      return {
        ...state,
        userViewsData: action.data,
      };
    case "SET_USER_LIKES_DATA":
      return {
        ...state,
        userLikesData: action.data,
      };
    case "SET_USER_POSTS_DATA":
      return {
        ...state,
        userPostsData: action.data,
      };
    case "SET_USER_COMMENTS_DATA":
      return {
        ...state,
        userCommentsData: action.data,
      };
    case "UPDATE_IS_USER_DATA_FETCHED":
      return {
        ...state,
        isUserDataFetched: action.data,
      };
    case "SET_IS_POLICY_ACEPTED":
      return {
        ...state,
        isPolicyAcepted: action.data,
      };
    case "SET_USER_BOOKED_DATA":
      return {
        ...state,
        userBookedData: action.data,
      };
    case "UPDATE_USER_SUBS_DATA":
      return {
        ...state,
        userSubsData: action.data,
      };
    case "SET_SHOWED_BOOKMARK_ITEM_COUNT":
      return {
        ...state,
        userShowedBookmarkItemsCount: action.data,
      };
    case "UPDATE_USER_BOOKMARK_FEED_DATA":
      return {
        ...state,
        userBookmarkFeed: action.data,
      };
    default:
      return state;
  }
};

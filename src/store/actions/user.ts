import { AppDispatch } from "@/store";
import {
  UserBookedDataType,
  UserBookmarkFeedType,
  UserCommentsDataIF,
  UserDataIF,
  UserLikesDataIf,
  UserPostsDataIF,
  UserSubsDataType,
  UserViewsDataIF,
} from "@/store/types/userTypes";
import { IframeDataType } from "@/types/simple";

export const updateIsLogined = (dispatch: AppDispatch, data: boolean) => {
  dispatch({
    type: "SET_IS_LOGINED",
    data: data,
  });
};

export const updateUserData = (
  dispatch: AppDispatch,
  data: UserDataIF | null,
) => {
  dispatch({
    type: "SET_USER_DATA",
    data: data,
  });
};

export const updateUserCommentsData = (
  dispatch: AppDispatch,
  data: UserCommentsDataIF | null,
) => {
  data = data ?? { count30: 0, countToday: 0 };
  dispatch({
    type: "SET_USER_COMMENTS_DATA",
    data: data,
  });
};

export const updateUserPostsData = (
  dispatch: AppDispatch,
  data: UserPostsDataIF | null,
) => {
  data = data ?? { count30: 0, countToday: 0 };
  dispatch({
    type: "SET_USER_POSTS_DATA",
    data: data,
  });
};
export const updateUserViewsData = (
  dispatch: AppDispatch,
  data: UserViewsDataIF | null,
) => {
  data = data ?? { count30: 0, countToday: 0 };
  dispatch({
    type: "UPDATE_USER_VIEWS_DATA",
    data: data,
  });
};

export const setIsPolicyAccepted = (dispatch: AppDispatch, data: boolean) => {
  dispatch({
    type: "SET_IS_POLICY_ACEPTED",
    data: data,
  });
};

export const updateUserLikesData = (
  dispatch: AppDispatch,
  data: UserLikesDataIf | null,
) => {
  data = data ?? { count30: 0, countToday: 0, userLikedPosts: [] };
  dispatch({
    type: "SET_USER_LIKES_DATA",
    data: data,
  });
};

export const updateUserBookedData = (
  dispatch: AppDispatch,
  data: UserBookedDataType,
) => {
  dispatch({
    type: "SET_USER_BOOKED_DATA",
    data: data,
  });
};

export const updateUserSubsData = (
  dispatch: AppDispatch,
  data: UserSubsDataType | null,
) => {
  dispatch({
    type: "UPDATE_USER_SUBS_DATA",
    data: data,
  });
};

export const updateIsUserDataFetched = (
  dispatch: AppDispatch,
  data: boolean,
) => {
  dispatch({
    type: "UPDATE_IS_USER_DATA_FETCHED",
    data: data,
  });
};

export const updateUserBookmarkFeed = (
  dispatch: AppDispatch,
  data: UserBookmarkFeedType[] | null,
) => {
  dispatch({
    type: "UPDATE_USER_BOOKMARK_FEED_DATA",
    data: data,
  });
};

export const updateShowedBookmarkItemsCount = (
  dispatch: AppDispatch,
  count: number,
) => {
  dispatch({
    type: "SET_SHOWED_BOOKMARK_ITEM_COUNT",
    data: count,
  });
};

export const updatePreviewPlayerData = (
  dispatch: AppDispatch,
  iframeData: IframeDataType | null,
) => {
  dispatch({
    type: "SET_PREVIEW_PLAYER_DATA",
    data: iframeData,
  });
};

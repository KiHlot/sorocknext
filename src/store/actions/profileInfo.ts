import { AppDispatch } from "@/store";
import {
  SingleUserRateCommentsDataType,
  SingleUserRateDataType,
  SubscriberItemIF,
  UserAwardsListType,
  UserChartStatisticDataType,
  UserMetricDataType,
} from "@/types/user";
import { ProfileActivityDataIF } from "@/types/profile";

export const updateProfileChartData = (
  dispatch: AppDispatch,
  data: UserChartStatisticDataType[] | null,
) => {
  dispatch({
    type: "UPDATE_PROFILE_CHARTS_DATA",
    data: data,
  });
};

export const setPageOwnerId = (
  dispatch: AppDispatch,
  pageOwnerId: number | null,
) => {
  dispatch({
    type: "SET_PAGE_OWNER_ID",
    data: pageOwnerId,
  });
};

export const updateIsPageOwner = (
  dispatch: AppDispatch,
  isPageOwner: boolean,
) => {
  dispatch({
    type: "SET_IS_PAGE_OWNER",
    data: isPageOwner,
  });
};

export const setAwardsList = (
  dispatch: AppDispatch,
  data: UserAwardsListType | null,
) => {
  dispatch({
    type: "SET_AWARDS_LIST",
    data: data,
  });
};

export const updatePageOwnerSubscribeData = (
  dispatch: AppDispatch,
  pageOwnerSubscribeData: {
    signedForMeData: SubscriberItemIF[] | null;
    signedForMeIdList: number[] | null;
  } | null,
) => {
  dispatch({
    type: "SET_PAGE_OWNER_SUBSCRIBE_DATA",
    data: pageOwnerSubscribeData,
  });
};

export const updateProfileActivity = (
  dispatch: AppDispatch,
  data: ProfileActivityDataIF | null,
) => {
  dispatch({
    type: "UPDATE_PROFILE_ACTIVITY",
    data: data,
  });
};

export const setPageOwnerMetric = (
  dispatch: AppDispatch,
  data: UserMetricDataType | null,
) => {
  dispatch({
    type: "SET_PAGE_OWNER_METRIC",
    data: data,
  });
};

export const updateRateCommentsData = (
  dispatch: AppDispatch,
  rateCommentsData: SingleUserRateCommentsDataType[] | null,
) => {
  dispatch({
    type: "UPDATE_RATE_COMMENTS_DATA",
    data: rateCommentsData,
  });
};

export const updateRateCommentsPages = (
  dispatch: AppDispatch,
  data: number | null,
) => {
  dispatch({
    type: "UPDATE_RATE_COMMENTS_PAGES",
    data: data,
  });
};

export const updateRateData = (
  dispatch: AppDispatch,
  rateData: SingleUserRateDataType | null,
) => {
  dispatch({
    type: "UPDATE_RATE_DATA",
    data: rateData,
  });
};

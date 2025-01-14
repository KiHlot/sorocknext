import {
  SingleUserRateCommentsDataType,
  SingleUserRateDataType,
  SubscriberItemIF,
  UserAwardsListType,
  UserChartStatisticDataType,
  UserMetricDataType,
} from "@/types/user";
import { ProfileActivityDataIF } from "@/types/profile";

export type ProfileInfoReducerType = {
  profileChartsData: UserChartStatisticDataType[] | null;
  pageOwnerId: number | null;
  isPageOwner: boolean;
  pageOwnerMetric: UserMetricDataType | null;
  userAwardsList: UserAwardsListType | null;
  pageOwnerSubscribeData: {
    signedForMeData: SubscriberItemIF[] | null;
    signedForMeIdList: number[] | null;
  } | null;
  profileActivity: ProfileActivityDataIF | null;
  rateCommentsData: SingleUserRateCommentsDataType[] | null;
  rateCommentsPagesCount: number | null;
  rateData: SingleUserRateDataType | null;
};

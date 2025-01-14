import { PostContentType } from "@/store/types/pageInfoTypes";
import { PostAuthorIF, TagPropsIF } from "@/types/post";
import { PageCommentsDataType } from "@/components/Blocks/CommentsBlock/PostCommentsBlock.types";

interface UserCountersIf {
  count30: number;
  countToday: number;
}

export interface UserCommentsDataIF extends UserCountersIf {}

export interface UserPostsDataIF extends UserCountersIf {}

export interface UserViewsDataIF extends UserCountersIf {}

export interface UserLikesDataIf extends UserCountersIf {
  userLikedPosts: number[];
}

export interface UserDataIF {
  userAvatarMedium: string | null;
  userAvatarSmall: string | null;
  userAvatarThumb: string | null;
  userId: number;
  userLevel: number;
  userLastName: string;
  userName: string;
  userSlug: string | null;
  userToken: string | null;
  userUri: string | null;
  userSignature: string | null;
  userIsActivated: boolean;
  userRatePosition: number | null;
}

export type UserBookedDataType = {
  userBookedPosts: number[];
};

export type UserSubsDataType = {
  signedAm: number[] | null;
  signedForMe: number[] | null;
};

export type UserBookmarkFeedType = {
  pageId: number;
  previewType: "simple" | "audio" | "video" | "videovk" | "audiovk";
  previewIframe: string | null;
  previewAudioVkData: string[] | null;
  coverImg80: string | null;
  coverImg500: string | null;
  innerImg500: string | null;
  tagsList: TagPropsIF[] | null;
  content: PostContentType;
  author: PostAuthorIF;
  comments: PageCommentsDataType;
};

export type UserReducerType = {
  isUserDataFetched: boolean;
  userData: UserDataIF | null;
  isLogined: boolean;
  userCommentsData: UserCommentsDataIF;
  userLikesData: UserLikesDataIf;
  userViewsData: UserViewsDataIF;
  userPostsData: UserPostsDataIF;
  isPolicyAcepted: boolean;
  userBookedData: UserBookedDataType;
  userSubsData: UserSubsDataType | null;
  userShowedBookmarkItemsCount: number;
  userBookmarkFeed: UserBookmarkFeedType[] | null;
};

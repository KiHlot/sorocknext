import {
  IsssetRubricSlugType,
  EntityIF,
  TagPropsIF,
  TagThumbIF,
} from "@/types/post";
import { IframeDataType } from "@/types/simple";
import { PageCommentsDataType } from "@/components/Blocks/CommentsBlock/PostCommentsBlock.types";
import { UserIF } from "@/types/user";

export type FrontPromoDataType = {
  author: UserIF;
  categories: IsssetRubricSlugType[] | null;
  content: {
    title: string;
    content: string;
    uri: string;
  };
  coverImg: string | null;
  innerImgLarge: string | null;
  innerImgMedium: string | null;
  pageId: number;
  tagsList: TagThumbIF[] | null;
  postDate: string;
};

export type PageInfoReducerType = {
  postType: EntityIF | null;
  isDataDisabled: boolean;
  comments: PageCommentsDataType | null;
};

export type TopAlbomsListType = {
  title: string;
  tabTitle: string;
  list: TopAlbomsListItemType[];
};

export type TopAlbomsListItemType = {
  pageId: number;
  place: number;
  coverImg500: string | null;
  coverImg200: string | null;
  innerImg500: string | null;
  content: PostContentType;
  media: PostMediaType;
};

export type PostContentType = {
  title: string;
  h1?: string;
  content: string;
  uri: string;
  country: string;
  dateUi?: string;
  dateDayNumber?: number;
  customDateUi?: string;
  customMonthUi?: string;
};

export type PostMediaType = {
  coverImg500?: string;
  audioTitle?: string;
  audioYear?: number | null;
  audioArtists?: TagPropsIF[] | null;
  audioCoverImg500?: string | null;
  iframeData?: IframeDataType;
};

export type RockDataTodayType = {
  dateNumberUi: string;
  monthUiShort: string;
  year: number;
  eventsList: RockDataTodayEventType[];
};

export type RockDataTodayEventType = {
  author: UserIF;
  categories: string[] | null;
  content: string;
  country: string;
  coverImgSmall: string;
  coverImgLarge: string;
  pageId: number;
  title: string;
  uri: string;
  tags: TagPropsIF[] | null;
};

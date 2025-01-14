import { AppDispatch } from "@/store";
import { PageCommentsDataType } from "@/components/Blocks/CommentsBlock/PostCommentsBlock.types";

export const updateIsDataDisabled = (dispatch: AppDispatch, data: boolean) => {
  dispatch({
    type: "UPDATE_IS_DATA_DISABLED",
    data: data,
  });
};

export const updatePageComments = (
  dispatch: AppDispatch,
  comments: PageCommentsDataType | null,
) => {
  dispatch({
    type: "UPDATE_COMMENTS",
    data: comments,
  });
};

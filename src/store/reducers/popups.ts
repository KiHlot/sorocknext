import { PopupsReducerType } from "@/store/types/popupsTypes";
import { AnyAction, Reducer } from "redux";

const initialState: PopupsReducerType = {
  isTagPopupOpened: false,
  tagPopupData: null,
  isPopupOverlayOpened: false,
};

export const popupsReducer: Reducer<PopupsReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "UPDATE_IS_POPUP_OVERLAY_OPENED":
      return {
        ...state,
        isPopupOverlayOpened: action.data,
      };

    case "UPDATE_IS_TAG_POPUP_OPENED":
      return {
        ...state,
        isTagPopupOpened: action.data,
      };

    case "UPDATE_TAG_POPUP_DATA":
      return {
        ...state,
        tagPopupData: action.data,
      };

    case "CLOSE_ALL_POPUPS":
      return {
        ...state,
        tagPopupData: null,
        isTagPopupOpened: false,
        isPopupOverlayOpened: false,
      };

    default:
      return state;
  }
};

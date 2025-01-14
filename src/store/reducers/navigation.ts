import { AnyAction, Reducer } from "redux";
import { NavigationReducerType } from "../types/navigationTypes";

const initialState: NavigationReducerType = {
  isLeftMenuOpened: false,
  isLogoMenuOpened: false,
  isOverlayOpened: false,
};

export const navigationReducer: Reducer<NavigationReducerType> = (
  state = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case "UPDATE_IS_LEFT_MENU_OPENED":
      return {
        ...state,
        isLeftMenuOpened: action.data,
      };

    case "UPDATE_IS_LOGO_MENU_OPENED":
      return {
        ...state,
        isLogoMenuOpened: action.data,
      };

    case "UPDATE_IS_NAV_OVERLAY_OPENED":
      return {
        ...state,
        isOverlayOpened: action.data,
      };

    case "CLOSE_ALL_NAV":
      return {
        ...state,
        isLeftMenuOpened: false,
        isLogoMenuOpened: false,
        isOverlayOpened: false,
      };

    default:
      return state;
  }
};

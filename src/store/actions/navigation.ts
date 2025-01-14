import { AppThunk } from "@/store";

export const toggleNavigations =
  (
    mode: "LEFT_MENU" | "LOGO_MENU" | "BOOKMARKS" | "CLOSE_ALL_NAV",
    isOpen?: boolean,
  ): AppThunk =>
  (dispatch) => {
    dispatch({
      type: "CLOSE_ALL_POPUPS",
      data: null,
    });

    dispatch({
      type: "CLOSE_ALL_NAV",
      data: null,
    });

    if (!isOpen || mode === "CLOSE_ALL_NAV") {
      return;
    }

    dispatch({
      type: "UPDATE_IS_NAV_OVERLAY_OPENED",
      data: true,
    });

    dispatch({
      type: `UPDATE_IS_${mode}_OPENED`,
      data: true,
    });
  };

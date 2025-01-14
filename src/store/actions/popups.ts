import { AppThunk } from "@/store";

export const togglePopups =
  <DataType>(
    mode: "TAG_POPUP" | "CLOSE_ALL_POPUPS",
    isOpen?: boolean,
    data?: DataType,
  ): AppThunk =>
  (dispatch) => {
    dispatch({
      type: "CLOSE_ALL_NAV",
      data: null,
    });

    dispatch({
      type: "CLOSE_ALL_POPUPS",
      data: null,
    });

    if (!isOpen || mode === "CLOSE_ALL_POPUPS") {
      return;
    }

    if (mode === "TAG_POPUP" && !!data) {
      dispatch({
        type: "UPDATE_TAG_POPUP_DATA",
        data: data,
      });
    }

    dispatch({
      type: "UPDATE_IS_POPUP_OVERLAY_OPENED",
      data: true,
    });

    dispatch({
      type: `UPDATE_IS_${mode}_OPENED`,
      data: true,
    });
  };

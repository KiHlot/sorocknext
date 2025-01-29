import { useEffect } from "react";

export function useOutsideClick(
  ref: any,
  handler: (a: any) => void,
  mode: "bool" | "null" = "bool",
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        return handler(mode === "bool" ? false : null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

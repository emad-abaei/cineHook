import { useEffect } from "react";

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    function callback(e: KeyboardEvent): void {
      if (e.key.toLocaleLowerCase() === key.toLowerCase()) action();
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}

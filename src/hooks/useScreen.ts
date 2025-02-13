import { useEffect, useState } from "react";

export function useScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    function checkScreenSize() {
      setIsSmallScreen(window.innerWidth <= 768);
    }

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isSmallScreen };
}

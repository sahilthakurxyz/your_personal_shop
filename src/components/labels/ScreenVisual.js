import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScreenVisual = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScreenVisual;

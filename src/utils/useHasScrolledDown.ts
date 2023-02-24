import { useState, useEffect } from "react";
// From here: https://github.com/hack4impact/hack4impact-website/blob/main/utils/useHasScrolledDown.ts

//Updated to use better type safety
// https://stackoverflow.com/questions/58956615/how-to-type-currenttarget-on-addeventlistener
const useHasScrolledDown = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  const onScroll = (e: Event) => {
    const target = e?.currentTarget;
    if (target instanceof Window) {
      const docEl = target.document.documentElement;
      setHasScrolledDown(docEl.scrollTop > 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return hasScrolledDown;
};

export default useHasScrolledDown;

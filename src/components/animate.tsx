import { useState, useEffect, useRef } from "react";
import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Animate: FC<Props> = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const current = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.25, // change this value to adjust when the element becomes visible
      }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex w-full transform flex-col opacity-0 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};

export default Animate;

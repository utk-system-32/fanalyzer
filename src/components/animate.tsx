import { useState, useEffect, useRef } from 'react';

const Animate = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.25, // change this value to adjust when the element becomes visible
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-500 transform opacity-0 ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-5'}`}>
      {children}
    </div>
  );
};

export default Animate;
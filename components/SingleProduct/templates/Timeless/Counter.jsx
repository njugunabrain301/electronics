import { useGlobalContext } from "@/Context/context";
import React, { useEffect, useRef, useState } from "react";

export default function Counter({ value, title, prefix, suffix }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { theme } = useGlobalContext();

  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            let startTime = null;
            const durationFactor = Math.log10(value + 1); // Adjust duration based on value
            const duration = 2000 * durationFactor; // Base duration multiplied by logarithmic factor

            const animateCount = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const elapsedTime = timestamp - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              const newValue = Math.floor(progress * value);
              setCount(newValue);
              if (progress < 1) requestAnimationFrame(animateCount);
            };

            requestAnimationFrame(animateCount);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span className="m-2 flex flex-col items-center">
      <span
        className="text-5xl rounded-[100%] border-[10px] w-[250px] h-[250px] flex items-center justify-center"
        style={{ borderColor: theme.palette.highlight.main }}
        ref={elementRef}
      >
        <span className="flex items-end justify-center">
          <span className="text-3xl">{prefix}</span>
          {" " + count}
          <span className="text-3xl">{suffix}</span>
        </span>
      </span>
      <span className="text-center mt-3">{title}</span>
    </span>
  );
}

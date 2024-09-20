import { useGlobalContext } from "@/Context/context";
import React, { useEffect, useRef, useState } from "react";
import CounterContent from "./Content/Counter";

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
    <CounterContent
      title={title}
      prefix={prefix}
      suffix={suffix}
      count={count}
      theme={theme}
      elementRef={elementRef}
    />
  );
}

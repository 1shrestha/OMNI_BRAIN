"use client";

import { useEffect, useRef, useState } from "react";

// Individual sliding digit column (0-9)
function SlidingDigit({ targetDigit, isVisible, delay = 0 }) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const translateY = isVisible ? -targetDigit * 10 : 0;

  return (
    <div className="relative inline-block h-[1em] overflow-hidden leading-none align-baseline">
      <div
        className="transition-transform duration-[1800ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col items-center"
        style={{
          transform: `translateY(${translateY}%)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {digits.map((d) => (
          <span key={d} className="h-[1em] flex items-center justify-center">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

// Splits the final number string into individual sliding reels
function SlidingNumber({ value, isVisible }) {
  const valueStr = String(value);

  return (
    <span className="inline-flex items-center font-mono select-none">
      {valueStr.split("").map((char, index) => {
        if (char === "." || char === "s") {
          return (
            <span key={index} className="inline-block leading-none">
              {char}
            </span>
          );
        }

        return (
          <SlidingDigit
            key={index}
            targetDigit={parseInt(char, 10)}
            isVisible={isVisible}
            delay={index * 120}
          />
        );
      })}
    </span>
  );
}

export default function MetricsStrip() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics = [
    { value: "12", label: "websites analyzed" },
    { value: "27", label: "documents processed" },
    { value: "54", label: "AI conversations" },
    { value: "1.4s", label: "avg. response time" },
  ];

  return (
    <section 
      ref={containerRef}
      className="bg-[#0B0F19] text-white py-16 border-t border-slate-900"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((m, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white flex justify-center items-center h-14">
                <SlidingNumber value={m.value} isVisible={isVisible} />
              </div>
              <div className="text-xs text-slate-400 tracking-wide uppercase font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
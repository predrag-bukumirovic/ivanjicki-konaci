"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useTransform } from "framer-motion";

export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const numeric = Number(value.replace(/\D/g, "")) || 0;
  const prefix = value.match(/^\D*/)?.[0] ?? "";
  const suffix = value.match(/\D*$/)?.[0] ?? "";

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, numeric, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}

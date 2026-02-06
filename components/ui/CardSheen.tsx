"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * CardSheen - High Fidelity Glass Refraction
 *
 * Creates a realistic specular highlight that moves across the card surface on hover.
 * Enhanced for visibility in both light and dark modes.
 */
interface CardSheenProps {
  className?: string;
}

const CardSheen: React.FC<CardSheenProps> = ({ className }) => {
  return (
    <>
      {/* 
        Liquid Layer: Slow, organic flow
        - Uses a large blurred radial gradient that drifts slowly
        - Duration extended to 3s for "liquid" feel
        - Opacity kept subtle to avoid distraction
      */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-10 overflow-hidden",
          className
        )}
      >
        <div
          className="
            absolute -inset-full top-[-50%]
            w-[300%] h-[300%]
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_60%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)]
            blur-[80px]
            opacity-0 group-hover:opacity-100
            transform translate-x-[-30%] translate-y-[-30%]
            group-hover:translate-x-[0%] group-hover:translate-y-[0%]
            transition-transform duration-[3000ms] ease-out
          "
          style={{ willChange: "transform, opacity" }}
        />
      </div>
    </>
  );
};

export default CardSheen;

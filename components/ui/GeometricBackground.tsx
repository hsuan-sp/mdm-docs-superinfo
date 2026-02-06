"use client";

import React from "react";

/**
 * Apple-style Pure Background
 *
 * 完全遵循 Apple 官網設計：
 * - 純淨的淺灰背景（淺色模式）
 * - 純淨的黑色背景（深色模式）
 * - 沒有任何漸層或裝飾
 * - 讓內容成為主角
 */
const GeometricBackground: React.FC = () => {
  return (
    <div className="geometric-bg fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-apple-bg transition-colors duration-700">
      {/* Aurora Gradients - Breathing Life into the Glass */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-blue-400/20 dark:bg-blue-500/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
      <div className="absolute top-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-purple-400/20 dark:bg-purple-500/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-indigo-300/20 dark:bg-indigo-500/30 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />

      {/* 
         Medical Blueprint Grid with ultra-wide structural masking 
         The mask is now much larger (95%) to avoid "blocky" transitions at the edges.
      */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{
          backgroundImage: "var(--grid-pattern)",
          backgroundSize: "var(--grid-size)",
          maskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      {/* Absolute Purity - No noise or glows to ensure no blurry artifacts */}
    </div>
  );
};

export default GeometricBackground;

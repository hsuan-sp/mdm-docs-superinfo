"use client"

import React from 'react'

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
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-white dark:bg-[#020202] transition-colors duration-700">
      {/* 
         Medical Blueprint Grid with ultra-wide structural masking 
         The mask is now much larger (95%) to avoid "blocky" transitions at the edges.
      */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundImage: 'var(--grid-pattern)',
          backgroundSize: 'var(--grid-size)',
          maskImage: 'radial-gradient(circle at center, transparent 20%, black 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 95%)'
        }} 
      />
      
      {/* Absolute Purity - No noise or glows to ensure no blurry artifacts */}
    </div>
  )
}

export default GeometricBackground

"use client";
import { useState, useEffect } from "react";

/**
 * useDebounce - 通用的 debounce hook
 * 
 * @param value - 要進行 debounce 的值
 * @param delay - 延遲時間（毫秒）
 * @returns debounced 後的值
 */
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

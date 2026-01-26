/**
 * I18n Utilities for Type-Safe Translations
 */

// Recursive type to extract all possible key paths from a nested object
export type PathsToLeaves<T> = T extends object
    ? { [K in keyof T]: `${Exclude<K, symbol>}${LeaveKeys<T[K]>}` }[keyof T]
    : "";

type LeaveKeys<T> = T extends object
    ? `.${PathsToLeaves<T>}`
    : "";

/**
 * Safely resolves a nested value from an object using a dot-path string.
 */
export function getNestedValue(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Replaces {variable} placeholders in a string with values from an arguments object.
 */
export function interpolate(text: string, args: Record<string, string | number>): string {
    if (!text) return "";
    return text.replace(/{(\w+)}/g, (_, key) => {
        const val = args[key];
        return val !== undefined ? String(val) : `{${key}}`;
    });
}

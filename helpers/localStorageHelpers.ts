/**
 * Helper functions for working with localStorage
 */

/**
 * Get item from localStorage
 * @param key - localStorage key
 * @param defaultValue - default value if key doesn't exist
 * @returns parsed value or defaultValue
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue;
    }

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error getting item from localStorage with key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set item to localStorage
 * @param key - localStorage key
 * @param value - value to store
 * @returns boolean indicating success
 */
export function setToLocalStorage<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item to localStorage with key "${key}":`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 * @param key - localStorage key
 * @returns boolean indicating success
 */
export function removeFromLocalStorage(key: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage with key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all localStorage
 * @returns boolean indicating success
 */
export function clearLocalStorage(): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Check if key exists in localStorage
 * @param key - localStorage key
 * @returns boolean indicating if key exists
 */
export function hasInLocalStorage(key: string): boolean {
  try {
    if (typeof window === 'undefined') {
      return false;
    }

    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking if key "${key}" exists in localStorage:`, error);
    return false;
  }
}
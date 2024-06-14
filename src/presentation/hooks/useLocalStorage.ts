import { useState } from 'react';

/**
 * Custom hook used to manage local storage using states
 *
 * @param {string} keyName The key of local storage
 * @param {string} defaultValue The default value for the local storage
 * @returns {[string, (newValue: string) => void]} A tuple containing the stored value and a function to set the value
 */
const useLocalStorage = (keyName: string, defaultValue: string): [string, (newValue: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return value;
      } else {
        window.localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {
      // Handle the error if needed
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;

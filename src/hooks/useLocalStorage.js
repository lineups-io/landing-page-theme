import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  const ns = typeof window === 'undefined' ? 'server' : window.location.hostname
  const namespacedKey = `${ns}:${key}`

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined')
      return initialValue

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(namespacedKey);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  useEffect(() => {
    try {
      const valueToStore = storedValue
      // Save to local storage
      window.localStorage.setItem(namespacedKey, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage

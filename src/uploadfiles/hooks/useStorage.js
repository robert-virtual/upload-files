import { useState } from "react";

export function useStorage(initValue, key) {
  const [value, setValue] = useState(
    () => localStorage.getItem(key) || initValue
  );
  return {
    [key]: value,
    ["set" + key]: (newValue) => {
      localStorage.setItem(key, newValue);
      setValue(newValue);
    },
  };
}

import React, { useState, SyntheticEvent, ChangeEvent } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }
    }
  };
};
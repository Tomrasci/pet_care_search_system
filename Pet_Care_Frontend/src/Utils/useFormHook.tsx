import { ChangeEvent, useState } from "react";

export const useFormHook = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);
  const resetValues = () => {
    setValues(initialValues);
  };
  return [
    values,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
    resetValues,
  ];
};

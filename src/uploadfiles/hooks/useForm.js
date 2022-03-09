import { useState } from "react";

function useForm(form) {
  const [values, setValues] = useState(form);

  return [
    values,
    ({ target }) => {
      setValues({
        ...values,
        [target.name]: target.value,
      });
    },
  ];
}
export default useForm;

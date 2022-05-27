import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const FilterCheckbox = ({
  changeChecked,
  type,
}: {
  changeChecked: (id: number) => void;
  type: any;
}) => {
  const { checked, label, id } = type;
  const labelText =
    label === "House_sitting"
      ? "House sitting"
      : label === "Medication_giving"
      ? "Medication giving"
      : label;
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={() => changeChecked(id)}
          />
        }
        label={labelText}
      />
    </>
  );
};

export default FilterCheckbox;

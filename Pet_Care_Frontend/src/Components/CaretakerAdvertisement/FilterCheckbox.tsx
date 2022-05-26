import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const FilterCheckbox = ({ changeChecked, type }: any) => {
  const { checked, label, id } = type;
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={checked}
            onChange={() => changeChecked(id)}
          />
        }
        label={label}
      />
    </div>
  );
};

export default FilterCheckbox;

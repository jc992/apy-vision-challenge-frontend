import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as BaseSelect,
} from '@mui/material';
import React from 'react';

export const Select = ({ label, value, handleSelect, items }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <BaseSelect value={value} label={label} onChange={handleSelect}>
        {items &&
          items.map(({ name, price }, i) => (
            <MenuItem key={i} value={name}>
              {name} - ${price.toFixed(2)}
            </MenuItem>
          ))}
      </BaseSelect>
    </FormControl>
  );
};

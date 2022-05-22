import { LoadingButton } from '@mui/lab';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as BaseSelect,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';

export const Select = ({ label, value, handleSelect, items }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <BaseSelect value={value} label={label} onChange={handleSelect}>
        {items ? (
          items.map(({ name, price }, i) => (
            <MenuItem key={i} value={name}>
              {name} - ${price.toFixed(2)}
            </MenuItem>
          ))
        ) : (
          <Container
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <LoadingButton loading />
          </Container>
        )}
      </BaseSelect>
    </FormControl>
  );
};

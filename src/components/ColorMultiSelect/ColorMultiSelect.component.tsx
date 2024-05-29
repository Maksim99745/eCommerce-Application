import { defaultColors } from '@constants/attributes.const';
import { Box, capitalize, Checkbox, Chip, ListItemIcon, ListItemText } from '@mui/material';
import { indigo } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';

const getColor = (color: string): string => {
  if (color === 'different') {
    return 'linear-gradient(to bottom, red,orange,yellow,green,blue,indigo,violet)';
  }

  return color;
};

interface ColorMultiSelectComponentProps {
  colors?: Array<string | undefined> | undefined;
  onChange?: (colors: string[]) => void;
}

export default function ColorMultiSelectComponent({ colors, onChange }: ColorMultiSelectComponentProps) {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const { target } = event;
    const selected = target.value;
    const selectedArray = typeof selected === 'string' ? selected.split(',') : selected;

    setValue(selectedArray);
    onChange?.(selectedArray);
  };

  useEffect(() => {
    if (!colors?.length) {
      setValue([]);
    }
  }, [colors]);

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="color-multi-label" size="small">
          Color
        </InputLabel>
        <Select
          labelId="color-multi-label"
          id="color-multi"
          multiple
          value={value}
          size="small"
          input={<OutlinedInput id="color-multi-chip" label="Color" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((color) => (
                <Box
                  key={color}
                  sx={{
                    background: getColor(color),
                    boxShadow: 1,
                    p: '3px',
                    borderRadius: 5,
                    height: '32px',
                    boxSizing: 'border-box',
                  }}
                >
                  <Chip label={capitalize(color)} sx={{ backgroundColor: indigo[50], height: '100%' }} />
                </Box>
              ))}
            </Box>
          )}
          onChange={handleChange}
        >
          {defaultColors.map((color) => (
            <MenuItem key={color} value={color}>
              <Checkbox checked={value.includes(color)} />
              <ListItemIcon>
                <Chip
                  label=" "
                  sx={{ background: getColor(color), height: 24, width: 24, border: '1px black solid' }}
                />
              </ListItemIcon>
              <ListItemText primary={capitalize(color)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
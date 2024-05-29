import { defaultColors } from '@constants/attributes.const';
import { Box, capitalize, Checkbox, Chip, ListItemIcon, ListItemText } from '@mui/material';
import { indigo } from '@mui/material/colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const ITEMS_COUNT = 4.5;
const ITEMS_WIDTH = 250;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * ITEMS_COUNT + ITEM_PADDING_TOP,
      width: ITEMS_WIDTH,
    },
  },
};

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
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((color) => (
                <Box
                  key={color}
                  sx={{
                    background: getColor(color),
                    boxShadow: 1,
                    p: '2px',
                    borderRadius: 5,
                    // height: '22px',
                    boxSizing: 'border-box',
                    display: 'flex',
                  }}
                >
                  <Chip label={capitalize(color)} sx={{ backgroundColor: indigo[50], height: '18px' }} />
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

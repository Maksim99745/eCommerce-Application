import { OrderBy, Ordering } from '@enums/ordering.enum';
import { SortOption, SortOptionValue } from '@models/product-filter.model';
import { Box, Button, ListItemIcon, ListItemText, useEventCallback } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextRotateVerticalIcon from '@mui/icons-material/TextRotateVertical';
import TextRotateUpIcon from '@mui/icons-material/TextRotateUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ClearIcon from '@mui/icons-material/Clear';

const sortOptions: SortOption[] = [
  {
    label: 'Price: Low to High',
    key: `${OrderBy.Price}${Ordering.Ask}`,
    icon: <KeyboardDoubleArrowDownIcon />,
    value: { orderBy: OrderBy.Price, ordering: Ordering.Ask },
  },
  {
    label: 'Price: High to Low',
    key: `${OrderBy.Price}${Ordering.Desc}`,
    icon: <KeyboardDoubleArrowUpIcon />,
    value: { orderBy: OrderBy.Price, ordering: Ordering.Desc },
  },
  {
    label: 'Name: A to Z',
    key: `${OrderBy.Name}${Ordering.Ask}`,
    icon: <TextRotateVerticalIcon />,
    value: { orderBy: OrderBy.Name, ordering: Ordering.Ask },
  },
  {
    label: 'Name: Z to A',
    key: `${OrderBy.Name}${Ordering.Desc}`,
    icon: <TextRotateUpIcon />,
    value: { orderBy: OrderBy.Name, ordering: Ordering.Desc },
  },
];

interface ProductListSortComponentProps {
  onChange?: (sort: SortOptionValue | null) => void;
}

export function ProductListSortComponent({ onChange }: ProductListSortComponentProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = useEventCallback((event: SelectChangeEvent) => {
    const option: SortOption | undefined = sortOptions.find(({ key }) => event.target.value === key);

    setValue(option?.key || '');
    onChange?.(option?.value || null);
  });

  const handleClear = useEventCallback(() => {
    setValue('');
    onChange?.(null);
  });

  const getSelectIcon = () =>
    value ? (
      <Button
        size="small"
        onClick={handleClear}
        sx={{ borderRadius: '50%', height: 22, minWidth: 22, width: 22, position: 'absolute', right: '10px' }}
        variant="contained"
        color="info"
      >
        <ClearIcon sx={{ height: 16 }} />
      </Button>
    ) : undefined;

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-select-label" size="small">
          Sort
        </InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          endAdornment={getSelectIcon()}
          value={value}
          label="Sort"
          size="small"
          onChange={handleChange}
          renderValue={(selected) => {
            const option = sortOptions.find(({ key }) => selected === key);

            if (!option) {
              return undefined;
            }

            return <Box sx={{ width: 0, height: 22 }}>{option.icon}</Box>;
          }}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

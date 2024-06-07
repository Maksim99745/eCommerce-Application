import { maxCount, minCount } from '@constants/products.const';
import { IconButton, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

interface CounterComponentProps {
  initCount?: number;
  onChange?: (count: number) => void;
}

function CounterComponent({ onChange, initCount = minCount }: CounterComponentProps) {
  const [count, setCount] = useState(initCount);

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = Math.min(prevCount + 1, maxCount);
      onChange?.(newCount);
      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, minCount);
      onChange?.(newCount);
      return newCount;
    });
  };

  const handleChange = ({ target }: { target: EventTarget & (HTMLInputElement | HTMLTextAreaElement) }) => {
    let value = parseInt(target.value, 10) || minCount;

    value = Math.max(1, Math.min(value, maxCount));
    setCount(value);
    onChange?.(value);
  };

  return (
    <Stack direction="row" alignItems="center" gap="2px">
      <IconButton onClick={handleDecrement} disabled={count <= 1} size="small">
        <RemoveIcon fontSize="small" />
      </IconButton>

      <TextField
        value={count}
        onChange={handleChange}
        inputProps={{
          min: minCount,
          max: maxCount,
          style: {
            padding: 5,
            textAlign: 'center',
          },
        }}
        type="tel"
        variant="outlined"
        size="small"
        sx={{ width: 50, p: 0 }}
      />

      <IconButton onClick={handleIncrement} disabled={count >= maxCount} size="small">
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default CounterComponent;

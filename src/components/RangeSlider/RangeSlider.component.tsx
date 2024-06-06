import { Range } from '@models/product-filter.model';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';

interface RangeSliderComponentProps {
  range?: Range;
  min: number;
  max: number;
  step: number;
  onChange?: (range: { min: number; max: number }) => void;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
}

export default function RangeSliderComponent({
  range,
  min,
  max,
  step,
  onChange,
  valueLabelDisplay = 'off',
}: RangeSliderComponentProps) {
  const [value, setValue] = useState<number[]>([range?.min || min, range?.max || max]);

  const handleOnChange = (_: Event, newValue: number | number[]) => {
    const arrayValue = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(arrayValue);
    onChange?.({ min: arrayValue[0], max: arrayValue[1] });
  };

  useEffect(() => setValue([range?.min || min, range?.max || max]), [range, min, max]);

  return (
    <Slider
      value={value}
      onChange={handleOnChange}
      valueLabelDisplay={valueLabelDisplay}
      min={min}
      max={max}
      step={step}
      disableSwap
    />
  );
}

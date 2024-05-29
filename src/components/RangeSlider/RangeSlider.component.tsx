import { defaultFormDebounce } from '@constants/ui.const';
import { Range } from '@models/product-filter.model';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface RangeSliderComponentProps {
  range?: Range;
  min: number;
  max: number;
  step: number;
  onChange?: (range: { min: number; max: number }) => void;
  getAriaValueText?: (value: number) => string;
}

export default function RangeSliderComponent({
  range,
  min,
  max,
  step,
  onChange,
  getAriaValueText,
}: RangeSliderComponentProps) {
  const [value, setValue] = useState<number[]>([range?.min || min, range?.max || max]);

  const debouncedOnChange = useDebouncedCallback(
    () => onChange?.({ min: value[0], max: value[1] }),
    defaultFormDebounce,
  );

  const handleOnChange = (_: Event, newValue: number | number[]) => {
    const arrayValue = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setValue(arrayValue);
    debouncedOnChange();
  };

  useEffect(() => setValue([range?.min || min, range?.max || max]), [range, min, max]);

  return (
    <Slider
      value={value}
      onChange={handleOnChange}
      valueLabelDisplay="auto"
      getAriaValueText={getAriaValueText}
      min={min}
      max={max}
      step={step}
      disableSwap
    />
  );
}

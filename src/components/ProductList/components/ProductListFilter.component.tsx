import ColorMultiSelectComponent from '@components/ColorMultiSelect/ColorMultiSelect.component';
import RangeSliderComponent from '@components/RangeSlider/RangeSlider.component';
import { defaultBrands, defaultCountries, defaultMaterials } from '@constants/attributes.const';
import { defaultProductsFilter, maxPrice, minPrice, productCurrencyMap, stepPrice } from '@constants/products.const';
import useCategory from '@hooks/useCategory';
import { ProductFilter } from '@models/product-filter.model';
import { Button, capitalize, Chip, Stack } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, FormContainer, MultiSelectElement, useForm } from 'react-hook-form-mui';

interface ProductListFilterComponentProps {
  onChange: (filter: ProductFilter) => void;
}

export function ProductListFilterComponent({ onChange }: ProductListFilterComponentProps) {
  const formContext = useForm<ProductFilter>({ defaultValues: defaultProductsFilter });
  const { control, reset, watch } = formContext;
  const { category } = useCategory();

  useEffect(() => reset(), [category, reset]);

  useEffect(() => {
    const subscription = watch((fields: ProductFilter) => onChange(fields));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <FormContainer<ProductFilter> formContext={formContext}>
      <Stack direction="row" gap={1} px={2} flexWrap="wrap">
        <Stack direction="row" minWidth={300} width={300} gap={2} alignItems="center">
          <Chip label={`${minPrice} ${productCurrencyMap.EUR}`} variant="outlined" />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <RangeSliderComponent
                min={minPrice}
                max={maxPrice}
                step={stepPrice}
                range={field.value}
                onChange={field.onChange}
                getAriaValueText={(value) => `${value} ${productCurrencyMap.EUR}`}
              />
            )}
          />
          <Chip label={`${maxPrice} ${productCurrencyMap.EUR}`} variant="outlined" />
        </Stack>

        <Controller
          name="colors"
          control={control}
          render={({ field }) => <ColorMultiSelectComponent onChange={field.onChange} colors={field.value} />}
        />

        <Controller
          name="countries"
          control={control}
          render={({ field }) => (
            <MultiSelectElement
              {...field}
              size="small"
              label="Country"
              showChips
              showCheckbox
              options={defaultCountries.map((country) => ({ id: country, label: country }))}
            />
          )}
        />

        <Controller
          name="materials"
          control={control}
          render={({ field }) => (
            <MultiSelectElement
              {...field}
              size="small"
              label="Material"
              showChips
              showCheckbox
              options={defaultMaterials.map((material) => ({ id: material, label: capitalize(material) }))}
            />
          )}
        />

        <Controller
          name="brands"
          control={control}
          render={({ field }) => (
            <MultiSelectElement
              {...field}
              size="small"
              label="Brand"
              showChips
              showCheckbox
              options={defaultBrands.map((brand) => ({ id: brand, label: brand }))}
            />
          )}
        />

        <Button onClick={() => reset()} variant="outlined" color="secondary">
          Reset
        </Button>
      </Stack>
    </FormContainer>
  );
}

const ProductListFilterMemoizedComponent = memo(ProductListFilterComponent);

export default ProductListFilterMemoizedComponent;

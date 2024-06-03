import ColorMultiSelectComponent from '@components/ColorMultiSelect/ColorMultiSelect.component';
import { ProductListSortComponent } from '@components/ProductList/components/ProductListSort.component';
import RangeSliderComponent from '@components/RangeSlider/RangeSlider.component';
import { defaultBrands, defaultCountries, defaultMaterials } from '@constants/attributes.const';
import { defaultProductsFilter, maxPrice, minPrice, productCurrencyMap, stepPrice } from '@constants/products.const';
import useCategory from '@hooks/useCategory';
import { ProductFilter } from '@models/product-filter.model';
import { Box, Button, capitalize, Chip, Stack, useTheme } from '@mui/material';
import { memo, useEffect } from 'react';
import { Controller, FormContainer, MultiSelectElement, useForm } from 'react-hook-form-mui';

interface ProductListFilterComponentProps {
  onChange: (filter: ProductFilter) => void;
}

export function ProductListFilterComponent({ onChange }: ProductListFilterComponentProps) {
  const formContext = useForm<ProductFilter>({ defaultValues: defaultProductsFilter });
  const { control, reset, watch } = formContext;
  const { category } = useCategory();
  const theme = useTheme();

  useEffect(() => reset(), [category, reset]);

  useEffect(() => {
    const subscription = watch((fields: ProductFilter) => onChange(fields));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: { xs: theme.spacing(-1), md: theme.spacing(-2) },
        zIndex: 1,
        bgcolor: 'white',
        borderRadius: 3,
        boxShadow: 2,
        px: { xs: 1, md: 2 },
        py: 1,
      }}
    >
      <FormContainer<ProductFilter> formContext={formContext}>
        <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="center">
          <Controller
            name="sort"
            control={control}
            render={({ field }) => <ProductListSortComponent onChange={field.onChange} />}
          />

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
                sx={{ '.MuiButtonBase-root': { height: '22px' } }}
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
                sx={{ '.MuiButtonBase-root': { height: '22px' } }}
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
                sx={{ '.MuiButtonBase-root': { height: '22px' } }}
                options={defaultBrands.map((brand) => ({ id: brand, label: brand }))}
              />
            )}
          />

          <Button onClick={() => reset()} variant="outlined" color="secondary">
            Reset
          </Button>
        </Stack>
      </FormContainer>
    </Box>
  );
}

const ProductListFilterMemoizedComponent = memo(ProductListFilterComponent);

export default ProductListFilterMemoizedComponent;

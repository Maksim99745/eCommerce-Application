import { Button, ButtonGroup } from '@mui/material';
import { ProductData, ProductVariant } from '@commercetools/platform-sdk';
import { getColorAttribute } from '@utils/get-color-attribute-value';
import styles from './VariantsButtons.module.scss';

interface VariantsButtonsProps {
  current: ProductData;
  selectedVariant: ProductVariant | undefined;
  handleVariantClick: (variant: ProductVariant) => void;
}

export default function VariantsButtonsBlock({ current, selectedVariant, handleVariantClick }: VariantsButtonsProps) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="Basic button group"
      className={styles.variantButtonGroup}
      sx={{
        '& .MuiButton-root': { border: '2px inset transparent' },
      }}
    >
      <Button
        className={
          selectedVariant?.id === current?.masterVariant.id ? styles.selectedVariantButton : styles.variantButton
        }
        key={current?.masterVariant.id}
        variant="contained"
        onClick={() => handleVariantClick(current?.masterVariant)}
        sx={{
          backgroundColor: `${getColorAttribute(current?.masterVariant)}`,
          '&:hover': {
            backgroundColor: `${getColorAttribute(current?.masterVariant)}`,
          },
        }}
      >
        {getColorAttribute(current?.masterVariant)}
      </Button>
      {current?.variants.map((variant) => (
        <Button
          key={variant.id}
          variant="contained"
          onClick={() => handleVariantClick(variant)}
          className={selectedVariant?.id === variant.id ? styles.selectedVariantButton : styles.variantButton}
          sx={{
            backgroundColor: getColorAttribute(variant),
            '&:hover': {
              backgroundColor: `${getColorAttribute(variant)}`,
            },
          }}
        >
          {getColorAttribute(variant)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

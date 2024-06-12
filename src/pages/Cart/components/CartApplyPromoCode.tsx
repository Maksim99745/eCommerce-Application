import { promoCodeFormSchema } from '@core/validation/cart-promo-code/cart-promo-code.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartPromoCodeFormData } from '@models/forms.model';
import { OperationResult } from '@models/index';
import { Button, Stack, useEventCallback } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import DiscountIcon from '@mui/icons-material/Discount';
import { TextFieldElement } from 'react-hook-form-mui';
import { useShowMessage } from '@hooks/useShowMessage';

export interface CartPromoCodeProps {
  onApplyPromoCode: (promoCodeData: CartPromoCodeFormData) => Promise<OperationResult>;
  disabled?: boolean;
}

export function CartPromoCode({ onApplyPromoCode, disabled }: CartPromoCodeProps) {
  const showMessage = useShowMessage();

  const formContext = useForm<CartPromoCodeFormData>({
    defaultValues: { promoCode: '' },
    resolver: zodResolver(promoCodeFormSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const getPromoCode = (): void => {
    const promoCodes = ['RS5', 'RS10'];
    const promoCode = promoCodes[Math.floor(Math.random() * promoCodes.length)];
    reset({ promoCode });
    showMessage(`Congratulations, your personal promo code is ${promoCode}`);
  };

  const performSave = useEventCallback(async (promoCode: CartPromoCodeFormData) => {
    const result = await onApplyPromoCode(promoCode);
    if (result.success) {
      reset();
    }
  });

  return (
    <FormProvider<CartPromoCodeFormData> {...formContext}>
      <form onSubmit={handleSubmit(performSave)} noValidate>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, paddingTop: 1 }}>
          <TextFieldElement<CartPromoCodeFormData>
            label="Promo code"
            name="promoCode"
            helperText={' '}
            InputLabelProps={{ shrink: true }}
            disabled={disabled}
            sx={{ minWidth: '160px' }}
            variant="standard"
          />
          <Stack sx={{ gap: 1 }}>
            <Button
              startIcon={<DiscountIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              type="submit"
              variant="contained"
            >
              Apply code
            </Button>
            <Button size="small" onClick={() => getPromoCode()}>
              Get personal discount
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}

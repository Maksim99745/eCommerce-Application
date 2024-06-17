import { CartPromoCodeFormData } from '@models/forms.model';
import { Button, Stack, useEventCallback } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import DiscountIcon from '@mui/icons-material/Discount';
import { TextFieldElement } from 'react-hook-form-mui';
import { RemoteOperationCallback } from '@models/remoteOperationCallback';
import { zodResolver } from '@hookform/resolvers/zod';
import { promoCodeFormSchema } from '@core/validation/cart-promo-code/cart-promo-code.schema';
import { ActivePromoCode } from './ActivePromoCode';

export interface CartApplyPromoCodeProps {
  activePromoCodesIds: string[];
  onApplyPromoCode: RemoteOperationCallback<CartPromoCodeFormData>;
  disabled?: boolean;
}

export function CartApplyPromoCode({ activePromoCodesIds, onApplyPromoCode, disabled }: CartApplyPromoCodeProps) {
  const formContext = useForm<CartPromoCodeFormData>({
    defaultValues: { promoCode: '' },
    resolver: zodResolver(promoCodeFormSchema),
    mode: 'all',
  });

  const { handleSubmit, reset, watch } = formContext;

  const isActiveCodes = activePromoCodesIds.length > 0;

  const promoCodeValue = watch('promoCode');
  const isPromoCodePassed = promoCodeValue.length > 0;

  const performSave = useEventCallback(async (promoCode: CartPromoCodeFormData) => {
    const result = await onApplyPromoCode(promoCode);
    if (result.success) {
      reset({ promoCode: '' });
    }
  });

  return (
    <FormProvider<CartPromoCodeFormData> {...formContext}>
      <form onSubmit={handleSubmit(performSave)} noValidate>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2, paddingTop: 1 }}>
          <Stack>
            <TextFieldElement<CartPromoCodeFormData>
              label="Promo code"
              name="promoCode"
              helperText={' '}
              InputLabelProps={{ shrink: true }}
              disabled={disabled}
              sx={{ minWidth: '160px' }}
              variant="standard"
            />
            {isActiveCodes && (
              <Stack direction="row" sx={{ gap: 0.5 }}>
                Active codes:
                {activePromoCodesIds?.map((code, index) => (
                  <ActivePromoCode id={code} key={code} isLastCode={index === activePromoCodesIds.length - 1} />
                ))}
              </Stack>
            )}
          </Stack>

          <Stack sx={{ gap: 0.5 }}>
            <Button
              startIcon={<DiscountIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              type="submit"
              size="small"
              variant="contained"
              disabled={disabled || !isPromoCodePassed}
            >
              Apply code
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}

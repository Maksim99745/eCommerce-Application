import { promoCodeFormSchema } from '@core/validation/cart-promo-code/cart-promo-code.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartPromoCodeFormData } from '@models/forms.model';
import { Button, Stack, Typography, useEventCallback } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import DiscountIcon from '@mui/icons-material/Discount';
import { TextFieldElement } from 'react-hook-form-mui';
import { useShowMessage } from '@hooks/useShowMessage';
import { RemoteOperationCallback } from '@models/remoteOperationCallback';
import { DiscountCode } from '@commercetools/platform-sdk';

export interface CartPromoCodeProps {
  promoCodes?: DiscountCode[];
  onApplyPromoCode: RemoteOperationCallback<CartPromoCodeFormData>;
  disabled?: boolean;
}

export function CartPromoCode({ promoCodes, onApplyPromoCode, disabled }: CartPromoCodeProps) {
  const showMessage = useShowMessage();

  const formContext = useForm<CartPromoCodeFormData>({
    defaultValues: { promoCode: '' },
    resolver: zodResolver(promoCodeFormSchema),
    mode: 'all',
  });

  const { handleSubmit, reset } = formContext;

  const getPromoCode = (): void => {
    const promoCodesCollection = ['RS5', 'RS10'];
    const promoCode = promoCodesCollection[Math.floor(Math.random() * promoCodesCollection.length)];
    reset({ promoCode });
    showMessage(`Congratulations, your promo code is ${promoCode}`);
  };

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
            <Stack direction="row" sx={{ gap: 0.5 }}>
              Active codes:
              {promoCodes?.map((code, index) => (
                <Typography key={code.id}>
                  {code?.name?.en}
                  {index === promoCodes.length - 1 ? '' : ','}
                </Typography>
              ))}
            </Stack>
          </Stack>

          <Stack sx={{ gap: 0.5 }}>
            <Button
              startIcon={<DiscountIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              type="submit"
              size="small"
              variant="contained"
            >
              Apply code
            </Button>
            <Button size="small" onClick={() => getPromoCode()}>
              Get discount
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}

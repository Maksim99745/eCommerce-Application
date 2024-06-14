import { CartPromoCodeFormData } from '@models/forms.model';
import { Button, Stack, useEventCallback } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import DiscountIcon from '@mui/icons-material/Discount';
import { TextFieldElement } from 'react-hook-form-mui';
import { useShowMessage } from '@hooks/useShowMessage';
import { RemoteOperationCallback } from '@models/remoteOperationCallback';
import { zodResolver } from '@hookform/resolvers/zod';
import { promoCodeFormSchema } from '@core/validation/cart-promo-code/cart-promo-code.schema';
import { useGetAvailablePromoCodes } from '@pages/Catalog/hooks/useGetAvailablePromoCodes';
import { MessagesToUser } from '@enums/messagesToUser';
import { ActivePromoCode } from './ActivePromoCode';

export interface CartPromoCodeProps {
  promoCodeIds: string[];
  onApplyPromoCode: RemoteOperationCallback<CartPromoCodeFormData>;
  disabled?: boolean;
}

export function CartPromoCode({ promoCodeIds, onApplyPromoCode, disabled }: CartPromoCodeProps) {
  const showMessage = useShowMessage();

  const formContext = useForm<CartPromoCodeFormData>({
    defaultValues: { promoCode: '' },
    resolver: zodResolver(promoCodeFormSchema),
    mode: 'all',
  });

  const { handleSubmit, reset, watch } = formContext;

  const { data } = useGetAvailablePromoCodes();
  const promoCodes = data?.results || [];

  const promoCodeValue = watch('promoCode');
  const isPromoCodePassed = promoCodeValue.length > 0;

  const getAvailablePromoCode = (): void => {
    const promoCode = promoCodes[Math.floor(Math.random() * promoCodes.length)].code;
    if (promoCode.length >= 1) {
      reset({ promoCode });
      showMessage(`Congratulations, your promo code is ${promoCode}`);
    } else {
      showMessage(MessagesToUser.NotAvailablePromoCodes);
    }
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
              {promoCodeIds?.map((code, index) => (
                <ActivePromoCode id={code} key={code} isLastCode={index === promoCodeIds.length - 1} />
              ))}
            </Stack>
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
            <Button size="small" disabled={disabled} onClick={() => getAvailablePromoCode()}>
              Get promo code
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}

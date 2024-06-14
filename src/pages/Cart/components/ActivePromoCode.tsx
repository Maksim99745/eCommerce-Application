import { Typography } from '@mui/material';
import { useShowMessage } from '@hooks/useShowMessage';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useGetActivePromoCode } from '../hooks/useGetActivePromoCode';

interface Props {
  id: string;
  isLastCode: boolean;
}

export function ActivePromoCode({ id, isLastCode }: Props) {
  const showMessage = useShowMessage();
  const { data, isLoading, error } = useGetActivePromoCode({ promoCodeId: id });

  if (error) {
    const errorMessage = createAppErrorMessage(error);
    showMessage(errorMessage, 'error');
  }

  if (!data && !isLoading) {
    return null;
  }

  return (
    <Typography>
      {data?.name?.en}
      {!isLastCode && ','}
    </Typography>
  );
}

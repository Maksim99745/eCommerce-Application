import { Typography } from '@mui/material';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useGetActivePromoCodeDescription } from '../hooks/useGetActivePromoCodeDescription';

interface Props {
  id: string;
  isLastCode: boolean;
}

export function ActivePromoCode({ id, isLastCode }: Props) {
  const { data, isLoading, error } = useGetActivePromoCodeDescription({ promoCodeId: id });

  if (!data && !isLoading) {
    return null;
  }

  return (
    <Typography>
      {data?.name?.en}
      {error && <Typography>Error: {createAppErrorMessage(error)}</Typography>}
      {!isLastCode && ','}
    </Typography>
  );
}

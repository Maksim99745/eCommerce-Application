import { Typography } from '@mui/material';
import { useShowMessage } from '@hooks/useShowMessage';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { useFetchPromoCodeDescriptions } from '../hooks/useGetPromoCodeDescriptions';

interface Props {
  id: string;
}

export function PromoCodeDescription({ id }: Props) {
  const showMessage = useShowMessage();
  const { data, isLoading, error } = useFetchPromoCodeDescriptions(id);

  if (error) {
    const errorMessage = createAppErrorMessage(error);
    showMessage(errorMessage, 'error');
  }

  if (!data && !isLoading) {
    return null;
  }

  return <Typography>{data?.name?.en}</Typography>;
}

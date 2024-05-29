import { useEventCallback } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';

const SUCCESS_MSG_DURATION = 3000;
const ERROR_MSG_DURATION = 6000;

type ShowMessageCallback = (message: string, variant?: VariantType) => void;

export const useShowMessage = (): ShowMessageCallback => {
  const { enqueueSnackbar } = useSnackbar();

  return useEventCallback<ShowMessageCallback>((message: string, variant: VariantType = 'success'): void => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: variant === 'success' ? SUCCESS_MSG_DURATION : ERROR_MSG_DURATION,
      style: { whiteSpace: 'pre-line' },
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    });
  });
};

import { useEventCallback } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';

const SUCCESS_MSG_DURATION = 2000;
const ERROR_MSG_DURATION = 6000;

export const useShowMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useEventCallback((message: string, variant: VariantType = 'success'): void => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: variant === 'success' ? SUCCESS_MSG_DURATION : ERROR_MSG_DURATION,
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    });
  });
};

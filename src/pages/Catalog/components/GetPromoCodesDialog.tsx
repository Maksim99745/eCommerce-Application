import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ElementType } from 'react';
import { MessagesToUser } from '@enums/messagesToUser';
import { createAppErrorMessage } from '@core/errorHandlers/createAppErrorMessage';
import { CopyPromoCode } from './CopyPromoCode';
import { useGetAvailablePromoCodes } from '../hooks/useGetAvailablePromoCodes';

export interface CleanCartDialogProps {
  openControl: ElementType;
  disabled?: boolean;
}

export function GetPromoCodesDialog({ openControl: OpenControl, disabled }: CleanCartDialogProps) {
  const { visible, show, close } = useModalState();

  const { data, error } = useGetAvailablePromoCodes();

  const isNotAvailablePromoCodes = data?.results.length === 0;

  return (
    <>
      <OpenControl onClick={show} disabled={disabled} />

      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'center' }}>
          Available promo codes
        </DialogTitle>
        <DialogContent>
          <Stack gap={1}>
            {data?.results.map((codeData) => (
              <CopyPromoCode key={codeData.id} promoCode={codeData.code} description={codeData?.description?.en} />
            ))}
            {error && <Typography>Error: {createAppErrorMessage(error)}</Typography>}
            {isNotAvailablePromoCodes && <Typography>{MessagesToUser.NotAvailablePromoCodes}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={close} autoFocus>
            Back to the shopping!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

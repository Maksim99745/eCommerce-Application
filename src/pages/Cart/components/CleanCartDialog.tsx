import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useEventCallback,
} from '@mui/material';
import { useModalState } from '@hooks/useModalState';
import { ElementType } from 'react';

export interface CleanCartDialogProps {
  openControl: ElementType;
  disabled?: boolean;
  onCleanCart: () => void;
}

export function CleanCartDialog({ openControl: OpenControl, disabled, onCleanCart }: CleanCartDialogProps) {
  const { visible, show, close } = useModalState();

  const handleSubmitRemove = useEventCallback(() => {
    close();
    onCleanCart();
  });

  return (
    <>
      <OpenControl onClick={show} disabled={disabled} />

      <Dialog
        open={visible}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Clean cart</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You sure to remove all products from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Disagree</Button>
          <Button onClick={handleSubmitRemove} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

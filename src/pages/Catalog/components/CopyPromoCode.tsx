import { Button, Stack, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useShowMessage } from '@hooks/useShowMessage';

type CopyPromoCodeProps = { promoCode: string; description?: string };

export function CopyPromoCode({ promoCode, description = 'Code:' }: CopyPromoCodeProps) {
  const showMessage = useShowMessage();

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(promoCode).then(() => showMessage(`Code: ${promoCode} successfully copied`));
  };

  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      <TextField
        label={description}
        value={promoCode}
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <Button startIcon={<ContentCopyIcon />} onClick={handleCopyToClipBoard} />
    </Stack>
  );
}

import { Button, Stack, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useShowMessage } from '@hooks/useShowMessage';

type CopyPromoCodeProps = { promoCode: string; description?: string };

export function CopyPromoCode({ promoCode, description = 'Code:' }: CopyPromoCodeProps) {
  const showMessage = useShowMessage();

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
      <CopyToClipboard text={promoCode}>
        <Button startIcon={<ContentCopyIcon />} onClick={() => showMessage(`Code: ${promoCode} successfully copied`)} />
      </CopyToClipboard>
    </Stack>
  );
}

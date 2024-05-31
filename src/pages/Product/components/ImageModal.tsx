import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactImageGallery from 'react-image-gallery';
import { ProductData } from '@commercetools/platform-sdk';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import styles from './ImageModal.module.scss';

interface ImageModalProps {
  visible: boolean;
  close: () => void;
  images: Array<{ original: string; thumbnail: string }>;
  data?: ProductData;
  defaultImageUrl: string;
  clickedImageIndex: number;
}

function ImageModal({ images, data, defaultImageUrl, visible, close, clickedImageIndex }: ImageModalProps) {
  return (
    <Dialog
      className={styles.dialogContainer}
      open={visible}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiPaper-root': { overflowX: 'hidden' },
        '& .image-gallery-thumbnails-container': { maxWidth: '100%', display: 'flex', justifyContent: 'center' },
        '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
      }}
    >
      <DialogTitle component="h2" variant="h6" className={styles.imageModalTitle}>
        {data?.name.en}

        <IconButton color="inherit" onClick={close} aria-label="close" className={styles.closeIcon}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.dialogContent} sx={{ overflowX: 'hidden' }}>
        <ReactImageGallery
          showThumbnails={images.length > 1}
          showFullscreenButton={false}
          showPlayButton={false}
          items={images}
          startIndex={clickedImageIndex}
          onErrorImageURL={defaultImageUrl}
          renderItem={(item) => <img src={item.original} alt={data?.name.en} className={styles.modalGalleryImage} />}
        />
      </DialogContent>
    </Dialog>
  );
}
export default ImageModal;

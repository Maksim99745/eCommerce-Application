import styles from './ImageElement.module.scss';

interface ImagesData {
  src: string;
  alt: string;
  id: string;
}

function ImageElement({ src, alt, id }: ImagesData) {
  return (
    <div key={id} className={`${styles.developerImgWrap} ${styles[`${id}`]}`}>
      <img src={src} alt={alt} className={styles.developerImg} />
    </div>
  );
}
export default ImageElement;

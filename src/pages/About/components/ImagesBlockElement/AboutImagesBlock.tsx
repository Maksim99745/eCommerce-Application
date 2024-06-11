import styles from './AboutImagesBlock.module.scss';
import ImageElement from '../ImageElement/ImageElement';

const imagesData = [
  { src: '/public/Sasha.jpg', alt: 'mentor photo', id: 'mentor-img' },
  { src: '/public/Tanya.jpg', alt: 'developer photo', id: 'developer-img-Tanya' },
  { src: '/public/Maksim.jpg', alt: 'developer photo', id: 'developer-img-Maksim' },
  { src: '/public/Roma.jpeg', alt: 'developer photo', id: 'developer-img-Roma' },
];

function AboutImagesContainer() {
  return (
    <div className={styles.aboutImagesContainer}>
      <div className={styles.imagesColumn}>
        <ImageElement {...imagesData[0]} />
        <ImageElement {...imagesData[3]} />
      </div>
      <div className={styles.imagesColumn}>
        <ImageElement {...imagesData[1]} />
        <ImageElement {...imagesData[2]} />
      </div>
    </div>
  );
}
export default AboutImagesContainer;

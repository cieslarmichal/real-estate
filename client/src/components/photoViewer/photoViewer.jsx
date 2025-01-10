import { useState } from 'react';
import styles from './photoViewer.module.css';
import { backendUrl } from '../../constants/api';

function PhotoViewer({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={styles.photosViewer}>
      <div className={styles.mainImage}>
        <img
          src={`${backendUrl}/public${selectedImage}`}
          className={styles.selectedImage}
          alt="Główne zdjęcie"
        />
      </div>

      <div className={styles.thumbnails}>
        {images.map((image) => (
          <img
            key={image}
            src={`${backendUrl}/public${image}`}
            alt="Miniaturka"
            className={`${styles.thumbnailImage} ${selectedImage === image ? styles.active : ''}`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default PhotoViewer;

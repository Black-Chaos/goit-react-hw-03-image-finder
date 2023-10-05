import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export function ImageGallery({images}) {
    return (
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            link={webformatURL}
            bigImg={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
    );
}
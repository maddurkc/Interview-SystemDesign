import { useState, useEffect } from 'react';
import '../App.css';

function InfiniteScroll() {
  const [images, setImages] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      url: `https://source.unsplash.com/random/200x200?pic=${i + 1}`,
    }))
  );
  const [isFetching, setIsFetching] = useState(false);
  const [nextImageId, setNextImageId] = useState(6);

  const fetchImages = async () => {
    setIsFetching(true);

    // Fetch a batch of new images
    setTimeout(async () => {
      const newImages = Array.from({ length: 5 }, (_, i) => ({
        // 6+0 to 6+4 (6 to 10)
        id: nextImageId + i,
        url: `https://source.unsplash.com/random/200x200?pic=${
          nextImageId + i
        }`,
      }));
      setImages((currentImages) => [...currentImages, ...newImages]);
      // 6+5 (which is 11, so in the next series it will be 11+0 to 11+4)
      setNextImageId(nextImageId + 5);
      setIsFetching(false);
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetching
    ) {
      //if the scroll has reached near to the rock bottom then we should call our core logic function to fetch newImages
      fetchImages();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextImageId, isFetching, handleScroll]);

  return (
    <div className='container'>
      <div className='image-container'>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Random ${image.id}`}
            className='image'
          />
        ))}
      </div>
      {isFetching && (
        <div className='loader'>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;

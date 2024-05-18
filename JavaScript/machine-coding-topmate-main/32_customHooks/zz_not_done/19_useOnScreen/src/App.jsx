import useOnScreen from './useOnScreen';

const ImageComponent = () => {
  const [imageRef, isVisible] = useOnScreen({ threshold: 0.5 });

  return (
    <div>
      <img
        ref={imageRef}
        src={isVisible ? 'path_to_image.jpg' : 'placeholder.jpg'}
        alt='Lazy Loaded Example'
        style={{ opacity: isVisible ? 1 : 0.5 }} // Change opacity based on visibility
      />
      <p>{isVisible ? 'Image is now visible!' : 'Image is not visible yet.'}</p>
    </div>
  );
};

export default ImageComponent;

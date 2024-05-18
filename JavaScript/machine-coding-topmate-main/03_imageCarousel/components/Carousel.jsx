import { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Carousel.css';

const CarouselItem = ({ src, alt, isActive }) => (
  <img
    src={src}
    alt={alt}
    className={classnames('slide', { 'slide-active': isActive })}
  />
);

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide(slide === data.length - 1 ? 0 : slide + 1);
  const prevSlide = () => setSlide(slide === 0 ? data.length - 1 : slide - 1);

  return (
    <div className='carousel'>
      <BsArrowLeftCircleFill onClick={prevSlide} className='arrow arrow-left' />
      {data.map((item, idx) => (
        <CarouselItem
          key={item.id} // Assuming each item has a unique 'id'
          src={item.src}
          alt={item.alt}
          isActive={slide === idx}
        />
      ))}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className='arrow arrow-right'
      />
      <span className='indicators'>
        {data.map((_, idx) => (
          <button
            key={idx}
            className={classnames('indicator', {
              'indicator-inactive': slide !== idx,
            })}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

Carousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

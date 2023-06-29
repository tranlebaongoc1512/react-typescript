import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import Film from './Film';

interface SliderProps {
    films: Film[];
}
export default function Slider({ films }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = films.length;
  const navigate = useNavigate();

  let autoScroll = true;
  let slideInterval: NodeJS.Timeout;
  const intervalTime = 5000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  }
  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  }

  function autoSlide() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, [])

  useEffect(() => {
    if (autoScroll) {
      autoSlide();
    }
    return () => clearInterval(slideInterval);
    // eslint-disable-next-line
  }, [currentSlide])

  return (
    <div className='slider'>
      {films.map((film, index) => (
        <div className={index === currentSlide ? 'slide current-slide' : 'slide'} key={index}>
          {index === currentSlide && <img src={film.banner} alt={film.title} onClick={() => navigate(`detail/${film.id}`)} />}
        </div>
      ))}
      <div className='slide-left'>
        <FontAwesomeIcon icon={faAngleLeft} onClick={previousSlide} />
      </div>
      <div className='slide-right'>
        <FontAwesomeIcon icon={faAngleRight} onClick={nextSlide} />
      </div>
    </div>
  )
}

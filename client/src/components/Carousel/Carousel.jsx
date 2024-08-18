import React, { useState, useEffect } from 'react';

import LEFT_ARROW from '../../assets/left-arrow.png';
import RIGHT_ARROW from '../../assets/right-arrow.png';

function Carousel({slides}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-center py-5">
          <div className="relative overflow-hidden w-full h-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
                  {slide}
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-75"
            onClick={prevSlide}
          >
            <img src={LEFT_ARROW} alt="Previous" />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-50 hover:opacity-75"
            onClick={nextSlide}
          >
            <img src={RIGHT_ARROW} alt="Next" />
          </button>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white'}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
  </div>

  );
}

export default Carousel;

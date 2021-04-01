import React from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function SlideShow({ images, w, h }) {
  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    scale: 0.4,
    arrows: false
  };

  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {
          images.map((each, index) => <img key={index} style={{ width: w, height: h }} src={each} />)
        }
      </Zoom>
    </div>
  )
}

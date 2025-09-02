import React from "react";
import Slide from "./Slide";

function SlideList({ slides }) {
  return (
    <div>
      {slides.map((slide) => (
        <Slide key={slide.id} slide={slide} />
      ))}
    </div>
  );
}

export default SlideList;

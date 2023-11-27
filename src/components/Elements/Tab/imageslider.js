import { useState } from "react";

const slideStyless = {
  width: "100%",
  height: "100%",
  borderRadius: "7px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyless = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyless = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyless = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyless = {
  display: "flex",
  justifyContent: "center",
};

const dotStyless = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
  display:'none'
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyless,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyless}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyless}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyless}>
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyless}>
        {slides.map((slide, slideIndex) => (
          <div 
            style={dotStyless}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
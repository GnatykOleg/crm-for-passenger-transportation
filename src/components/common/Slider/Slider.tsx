// Import required dependencies:

// React
import React, { FC } from "react";

// React Bootstrap
import { Carousel } from "react-bootstrap";

// Images
import renault from "../../../assets/images/cars/renault.webp";
import mercedes from "../../../assets/images/cars/mercedes.webp";
import transporter from "../../../assets/images/cars/transporter.webp";

// Make array with images
const pictures = [renault, mercedes, transporter];

// Declaring a Slider component
const Slider: FC = () => (
  <Carousel>
    {pictures.map((picture) => (
      <Carousel.Item>
        <img
          style={{
            maxHeight: "500px",
            margin: "auto",
          }}
          src={picture}
          alt="car-in-slider"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

// Export the Slider component:
export default Slider;

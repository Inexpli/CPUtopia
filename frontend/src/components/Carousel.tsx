import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const responsive = {
  defaultSize: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export const MainCarousel = () => {
  return (
    <div className="w-full z-0">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        arrows={false}
        className="w-full"
        containerClass="w-full"
        itemClass="flex justify-center items-center"
      >
        <img
          src="https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg"
          className="w-full object-cover h-48"
          alt="Banner"
        />
        <img
          src="https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg"
          className="w-full object-cover h-48"
          alt="Banner"
        />
      </Carousel>
    </div>
  );
};

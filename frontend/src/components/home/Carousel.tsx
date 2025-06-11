import "react-multi-carousel/lib/styles.css"
import Carousel from "react-multi-carousel"

const responsive = {
  defaultSize: {
    breakpoint: { max: 4000, min: 0 },
    items: 1
  }
}

const carouselItems = [
  {
    image: "Carousele1.png"
  },
  {
    image: "Carousele2.png"
  }
]

export const MainCarousel = () => {
  return (
    <div className="relative z-0 w-full">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        arrows={false}
        className="w-full"
        containerClass="w-full"
        itemClass="relative"
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="relative h-96 w-full"
          >
            <img
              src={item.image}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

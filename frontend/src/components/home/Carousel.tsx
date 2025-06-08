import "react-multi-carousel/lib/styles.css"
import Carousel from "react-multi-carousel"
import { useNavigate } from "react-router-dom"

const responsive = {
  defaultSize: {
    breakpoint: { max: 4000, min: 0 },
    items: 1
  }
}

const carouselItems = [
  {
    image:
      "https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg",
    title: "Najnowsze Procesory",
    description: "Odkryj moc najnowszych procesorów w naszym sklepie"
  },
  {
    image: "https://img.freepik.com/free-photo/gaming-accessories-arrangement_23-2149829792.jpg",
    title: "Sprzęt Gamingowy",
    description: "Najwyższej jakości komponenty dla graczy"
  },
  {
    image: "https://img.freepik.com/free-photo/computer-hardware-parts_93675-129365.jpg",
    title: "Komponenty Komputerowe",
    description: "Szeroki wybór części do Twojego PC"
  }
]

export const MainCarousel = () => {
  const navigate = useNavigate()

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
            className="relative h-[500px] w-full"
          >
            <img
              src={item.image}
              className="h-full w-full object-cover"
              alt={item.title}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white">
              <h2 className="mb-4 text-4xl font-bold">{item.title}</h2>
              <p className="text-xl">{item.description}</p>
              <button
                onClick={() => navigate("/pc-parts")}
                className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Zobacz więcej
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

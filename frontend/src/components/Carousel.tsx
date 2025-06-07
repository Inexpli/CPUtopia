import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const responsive = {
  defaultSize: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const carouselItems = [
  {
    image: "https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg",
    title: "Najnowsze Procesory",
    description: "Odkryj moc najnowszych procesorów w naszym sklepie",
  },
  {
    image: "https://img.freepik.com/free-photo/gaming-accessories-arrangement_23-2149829792.jpg",
    title: "Sprzęt Gamingowy",
    description: "Najwyższej jakości komponenty dla graczy",
  },
  {
    image: "https://img.freepik.com/free-photo/computer-hardware-parts_93675-129365.jpg",
    title: "Komponenty Komputerowe",
    description: "Szeroki wybór części do Twojego PC",
  },
];

export const MainCarousel = () => {
  return (
    <div className="w-full z-0 relative">
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
          <div key={index} className="relative w-full h-[500px]">
            <img
              src={item.image}
              className="w-full h-full object-cover"
              alt={item.title}
            />
            <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-white">
              <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
              <p className="text-xl">{item.description}</p>
              <button className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-semibold">
                Zobacz więcej
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

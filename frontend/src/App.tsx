import "./App.css";
import { Navbar } from "@/components/Navbar.tsx";
import { MainCarousel } from "@/components/Carousel.tsx";

function App() {
  return (
    <div className="bg-neutral-800 text-200 w-screen h-screen font-sans">
      <Navbar />
      <MainCarousel />
    </div>
  );
}

export default App;

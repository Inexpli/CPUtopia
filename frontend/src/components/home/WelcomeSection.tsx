import { useNavigate } from "react-router-dom"

export const WelcomeSection = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Witaj w CPUtopia
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Twoje centrum komputerowe, gdzie znajdziesz najwyższej jakości komponenty do budowy
          swojego wymarzonego PC. Oferujemy szeroki wybór podzespołów od renomowanych producentów w
          konkurencyjnych cenach.
        </p>
        <div className="mt-10">
          <button
            onClick={() => navigate("/pc-parts")}
            className="rounded-lg bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-700"
          >
            Zobacz cały asortyment
          </button>
        </div>
      </div>
    </div>
  )
}

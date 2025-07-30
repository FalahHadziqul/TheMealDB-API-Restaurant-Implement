import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <picture className="absolute inset-0 w-full h-full">
        <source media="(min-width: 640px)" srcSet="/BannerCroppedMore.jpg" />
        <img
          src="/BannerMobile.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 bg-black opacity-45"></div>

      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:translate-x-8 xl:translate-x-35">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-2">The World's Culinary</h1>
        <h2 className="text-white text-2xl md:text-4xl font-semibold mb-2">At Its Finest ~</h2>
        <h3 className="text-white text-base md:text-2xl mb-4">Bring your favorite meals to life now with D’lios!</h3>
        <button
          onClick={() => navigate("/exploreCategories")}
          className="px-6 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300 font-bold"
        >
          Start Cooking !
        </button>
      </div>
    </section>
  );
};

export default Hero;
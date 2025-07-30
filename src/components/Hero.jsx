import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
      <section className="w-full h-screen relative">
        <img src="/BannerCroppedMore.jpg" alt="Hero" className="w-full h-full object-cover blur-[3px]"/>
        <div className="absolute inset-0 bg-black opacity-45"></div>
        <div className="absolute inset-0 flex flex-col items-start justify-center">
          <h1 className="text-white text-7xl font-bold -translate-y-5 translate-x-58">The World's Culinary</h1>
          <h2 className="text-white text-4xl font-bold -translate-y-5 translate-x-60">At Its Finest ~</h2>
          <h3 className="text-white text-2xl font-bold -translate-y-5 translate-x-60">Bring your favorite meals to life now with D’lios!</h3>
          <button onClick={() => navigate("/exploreCategories")} className="mt-6 px-6 py-2 text-white border border-white rounded-lg 
          hover:bg-white hover:text-black transition-colors duration-300 -translate-y-5 translate-x-60 font-bold">
            Start Cooking !
          </button>
        </div>
      </section>
  );
};

export default Hero;
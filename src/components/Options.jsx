import { Search, Menu } from 'lucide-react';


const Options = () => {
  return (
    <div className="relative flex-col flex-1 items-center max-w-3xl px-4 pt-17 sm:px-6 lg:px-8 mx-auto">
      <div>
        
        <div className="flex w-full max-w-4xl items-center rounded-full border border-gray-400 bg-white p-2 shadow-">
          <div className="flex-auto border-r not-even:border-gray-300 px-10.5 py-1">
            <div className="mb-1 text-sm font-semibold text-gray-900 xl:text-2xl">Meal Categories</div>
            <input type="text" placeholder="Adjust your likings" className="text-xs xl:text-lg w-full border-none text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div className="flex-auto border-r border-gray-300 px-3 py-1">
            <div className="mb-1 text-sm font-semibold text-gray-900 xl:text-2xl">Regional's Meal</div>
            <input type="text" placeholder="Countries' Special" className="text-xs xl:text-lg w-full border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <button className="ml-2 rounded-full bg-red-500 p-4 text-white transition-colors hover:bg-red-600">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>

    </div>

  );
};

export default Options;
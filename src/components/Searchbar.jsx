import { Search} from 'lucide-react';


const Searchbar = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex-col justify-center">
        
        <div className="flex w-full max-w-4xl items-center rounded-full border border-gray-200 bg-white p-2 shadow-">
          
          <div className="flex-auto border-r not-even:border-gray-300 px-7 py-3">
            <div className="mb-1 text-xl font-semibold text-gray-900">Meal Categories</div>
            <input type="text" placeholder="Adjust your likings" className="text-md w-full border-none text-gray-600 placeholder-gray-400 outline-none" />
          </div>

          <div className="flex-auto border-r border-gray-300 px-6 py-3">
            <div className="mb-1 text-xl font-semibold text-gray-900">Regional's Meal</div>
            <input type="text" placeholder="Countries' Special" className="text-md w-full border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none" />
          </div>

          <button className="ml-2 rounded-full bg-red-500 p-4 text-white transition-colors hover:bg-red-600">
            <Search className="h-4 w-4" />
          </button>

        </div>

      </div>
    </div>

  );
};

export default Searchbar;
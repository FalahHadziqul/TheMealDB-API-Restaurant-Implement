import { Search} from 'lucide-react';


const Searchbar = () => {
  return (
    <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div class="mb-12 flex justify-center">
        <div class="flex w-full max-w-4xl items-center rounded-full border border-gray-200 bg-white p-2 shadow-lg">
          <div class="flex-1 border-r border-gray-200 px-6 py-3">
            <div class="mb-1 text-xl font-semibold text-gray-900">Meal Categories</div>
            <input type="text" placeholder="Adjust your likings" class="text-md w-full border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <div class="flex-1 border-r border-gray-200 px-6 py-3">
            <div class="mb-1 text-xl font-semibold text-gray-900">Regional's Meal</div>
            <input type="text" placeholder="Adjust your likings" class="text-md w-full border-none bg-transparent text-gray-600 placeholder-gray-400 outline-none" />
          </div>
          <button class="ml-2 rounded-full bg-red-500 p-4 text-white transition-colors hover:bg-red-600">
            <Search class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

  );
};

export default Searchbar;
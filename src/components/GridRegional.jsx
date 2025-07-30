import { useState, useEffect } from 'react';
import { Heart, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const GridRegional  = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('regional');
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Popup modal state
  const [isOpen, setIsOpen] = useState(false);
  const [mealData, setMealData] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);

  // Fetch meal detail by id
  const fetchMealData = async (mealId) => {
    setLoadingDetail(true);
    setErrorDetail(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setMealData(data.meals[0]);
      } else {
        setErrorDetail('No meal data found.');
      }
    } catch (err) {
      setErrorDetail('Failed to fetch meal details.');
    } finally {
      setLoadingDetail(false);
    }
  };

  // Open popup and fetch meal detail
  const openPopup = (mealId) => {
    setIsOpen(true);
    setCurrentSlide(0);
    fetchMealData(mealId);
  };

  // Close popup
  const closePopup = () => {
    setIsOpen(false);
    setCurrentSlide(0);
  };

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch Data dari TheMealDBAPI
        const response = await fetch('/data/regions.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }
        
        const listOf = await response.json();
        const data = listOf.meals;
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

    // Fetch meals by category // DONE
  const fetchMealsByRegion = async (area) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
      }
    }
    return ingredients;
  };

  const getInstructions = (instructionText) => {
    if (!instructionText) return [];
    return instructionText
      .split(/\r\n|\n|\r/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
  };

  // Update URL when state changes
  const updateURL = (view, category = '', search = '') => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    
    const searchString = params.toString();
    const url = searchString ? `?${searchString}` : '';
    
    if (view === 'meals') {
      window.history.pushState({}, '', `${url}#meals`);
    } else {
      window.history.pushState({}, '', searchString ? `?${searchString}` : '/');
    }
  };

  // Handle show more button click // DONE
  const handleShowMore = (areaName) => {
    setSelectedCategory(areaName);
    setCurrentView('meals');
    updateURL('meals', areaName, searchQuery);
    fetchMealsByRegion(areaName);
  };

    const createSlides = () => {
    if (!mealData) return [];

    const ingredients = getIngredients(mealData);
    const instructions = getInstructions(mealData.strInstructions);

    const slides = [
      {
        title: "Overview",
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Category: </span>
                <span className="text-gray-600">{mealData.strCategory}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Cuisine: </span>
                <span className="text-gray-600">{mealData.strArea}</span>
              </div>
              {mealData.strTags && (
                <div>
                  <span className="font-semibold text-gray-700">Tags: </span>
                  <span className="text-gray-600">{mealData.strTags}</span>
                </div>
              )}
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">About this dish</h4>
              <p className="text-amber-700 text-sm">
                A delicious dishthat brings authentic flavors 
                to your kitchen. Perfect for family dinners or special occasions.
              </p>
            </div>

            {mealData.strYoutube && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Video Tutorial</h4>
                <a 
                  href={mealData.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-700 text-sm hover:text-red-800 underline"
                >
                  Watch the step by step on YouTube
                </a>
              </div>
            )}
          </div>
        )
      },
      {
        title: "Ingredients",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">What you'll need:</h4>
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Shopping Tip</h5>
              <p className="text-blue-700 text-sm">
                Fresh ingredients will give you the best flavor.
              </p>
            </div>
          </div>
        )
      },
      {
        title: "Instructions",
        content: (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Step-by-step:</h4>
            <div className="space-y-4">
              {instructions.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
    ];
    return slides;
  };

  const slides = mealData ? createSlides() : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-[90rem] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Loading..
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Loading skeleton */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error Loading Products</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen"> {/* Parent yang menngisi full height view-port*/}
      <div className="max-w-[90rem] mx-auto">
        {currentView === 'regional' ? (
          <>
            <h1 className="underline sm:no-underline text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Regional</h1>
        
            {/* Responsive Grid : 1 col mobile, 2 cols tablet, 3 cols desktop, 4 cols large desktop */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-6 gap-x-4">
              {foods.map((product) => (
                <div key={product.idCategory} className="mx-auto sm:mx-0 sm:border sm:border-gray-300 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-100">
                  {/* Product Image */}
                  <div className="relative h-60 lg:h-50 xl:h-45 overflow-hidden">
                    <img
                      src={product.strMealThumb}
                      alt={product.strArea}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className=" text-center font-semibold text-gray-900 line-clamp-2 text-2xl">
                      {product.strArea}
                    </h3>
                    
                    
                    <button 
                      onClick={() => handleShowMore(product.strArea)}
                      className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg hover:bg-red-400 transition-colors text-sm font-medium">
                      Explore More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="underline sm:no-underline text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Regional</h1>
            
            {/* Responsive Grid : 1 col mobile, 2 cols tablet, 3 cols desktop, 4 cols large desktop */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-6 gap-x-4">
              {meals.map((product) => (
                <div key={product.idMeal} className="mx-auto sm:mx-0 sm:border sm:border-gray-300 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-100">
                  {/* Product Image */}
                  <div className="relative h-60 lg:h-50 xl:h-45 overflow-hidden">
                    <img
                      src={product.strMealThumb}
                      alt={product.strArea}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                      }}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="relative p-4">
                    <h3 className="text-center font-semibold text-gray-900 line-clamp-2 text-lg lg:text-xl">
                      {product.strMeal}
                    </h3>
                    <button 
                      className="w-full mt-3 bg-pink-600 text-white py-2 rounded-lg hover:bg-red-400 transition-colors text-sm font-medium"
                      onClick={() => openPopup(product.idMeal)}
                    >
                      Show Recipe
                    </button>
                  </div>
                </div>
              ))}
              {/* Popup Modal for meal detail */}
              {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {mealData ? mealData.strMeal : "Recipe Details"}
                      </h2>
                      <button
                        onClick={closePopup}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                      <div className="flex items-center justify-center p-8">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                          <span className="text-gray-600">Loading recipe...</span>
                        </div>
                      </div>
                    )}

                    {/* Error State */}
                    {error && (
                      <div className="p-8 text-center">
                        <div className="text-red-600 font-semibold mb-2">Error Loading Recipe</div>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button 
                          onClick={() => fetchMealData(product.idMeal)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    )}

                    {/* Content */}
                    {mealData && slides.length > 0 && (
                      <>
                        {/* Slide Navigation */}
                        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                          <button
                            onClick={prevSlide}
                            disabled={currentSlide === 0}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft className="w-3 h-3" />
                            Previous
                          </button>
                          
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-600">
                              {slides[currentSlide].title}
                            </span>
                            <div className="flex gap-1">
                              {slides.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentSlide(index)}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {currentSlide + 1} / {slides.length}
                            </span>
                          </div>

                          <button
                            onClick={nextSlide}
                            disabled={currentSlide === slides.length - 1}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Next
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Slide Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                          <div className="min-h-[300px]">
                            {slides[currentSlide].content}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {foods.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No foods found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridRegional ;
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Star, Clock, Users, Loader2 } from 'lucide-react';

const CategoryDetail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mealData, setMealData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample meal IDs from TheMealDB - you can change this to any meal ID
  const sampleMealId = "52772"; // Teriyaki Chicken Casserole

  const fetchMealData = async (mealId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      
      if (data.meals && data.meals[0]) {
        setMealData(data.meals[0]);
      } else {
        setError("Recipe not found");
      }
    } catch (err) {
      setError("Failed to fetch recipe data");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract ingredients from the API response
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

  // Helper function to split instructions into steps
  const getInstructions = (instructionText) => {
    if (!instructionText) return [];
    return instructionText
      .split(/\r\n|\n|\r/)
      .filter(step => step.trim().length > 0)
      .map(step => step.trim());
  };

  // Create slides based on fetched meal data
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

  const openPopup = () => {
    setIsOpen(true);
    setCurrentSlide(0);
    if (!mealData) {
      fetchMealData(sampleMealId);
    }
  };

  const closePopup = () => {
    setIsOpen(false);
    setCurrentSlide(0);
  };

  // Default product card data (you can modify this or make it dynamic too)
  const productCard = {
    name: mealData ? mealData.strMeal : "Delicious Recipe",
    image: mealData ? mealData.strMealThumb : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    price: "$12.99",
    rating: 4.5
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Product Card */}
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img 
          src={productCard.image} 
          alt={productCard.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{productCard.name}</h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-green-600">{productCard.price}</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-600">{productCard.rating}</span>
            </div>
          </div>
          <button
            onClick={openPopup}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View Recipe Details
          </button>
        </div>
      </div>

      {/* Popup Modal */}
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
                  onClick={() => fetchMealData(sampleMealId)}
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
                    <ChevronLeft className="w-4 h-4" />
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
                    <ChevronRight className="w-4 h-4" />
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
  );
};

export default CategoryDetail;
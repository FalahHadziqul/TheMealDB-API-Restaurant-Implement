

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Clock, Users, Star } from 'lucide-react';

const CategoryDetail = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all food categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch meals by category
  const fetchMealsByCategory = async (categoryName) => {
    try {
      setMealsLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
      const data = await response.json();
      setMeals(data.meals || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch meals');
      console.error('Error fetching meals:', err);
    } finally {
      setMealsLoading(false);
    }
  };

  // Handle category selection
  const handleShowMore = async (category) => {
    setSelectedCategory(category);
    await fetchMealsByCategory(category.strCategory);
  };

  // Go back to categories view
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setMeals([]);
  };

  // Initialize component
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchCategories}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {selectedCategory ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToCategories}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Categories
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedCategory.strCategory} Meals</h1>
                <p className="text-gray-600">Discover delicious {selectedCategory.strCategory.toLowerCase()} recipes</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Food Categories</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our collection of delicious meal categories. Click "Show More" to discover amazing recipes in each category.
              </p>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category.idCategory} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Category Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.strCategoryThumb} 
                    alt={category.strCategory}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.strCategory}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {category.strCategoryDescription?.slice(0, 120)}...
                  </p>
                  
                  <button
                    onClick={() => handleShowMore(category)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Show More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Meals Grid */}
        {selectedCategory && (
          <>
            {mealsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading {selectedCategory.strCategory.toLowerCase()} meals...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meals.map((meal) => (
                  <div 
                    key={meal.idMeal} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
                  >
                    {/* Meal Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={meal.strMealThumb} 
                        alt={meal.strMeal}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white bg-opacity-90 rounded-full p-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    </div>

                    {/* Meal Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{meal.strMeal}</h3>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>25-30 min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>4 servings</span>
                        </div>
                      </div>

                      <button
                        onClick={() => window.open(`https://www.themealdb.com/meal/${meal.idMeal}`, '_blank')}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No meals found */}
            {!mealsLoading && meals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No meals found in this category.</p>
                <button
                  onClick={handleBackToCategories}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>Powered by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">TheMealDB API</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryDetail;
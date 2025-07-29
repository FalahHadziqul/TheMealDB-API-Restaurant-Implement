import React, { useState, useEffect } from 'react';

const Grid = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch Data dari TheMealDBAPI
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        
        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }
        
        const listOfCategoriees = await response.json();
        const data = listOfCategoriees.categories;
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Categories
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    <div className="min-h-screen p-2"> {/* Parent yang menngisi full height view-port*/}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Categories</h1>
        
        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop, 4 cols large desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((product) => (
            <div key={product.idCategory} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-100">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.strCategoryThumb}
                  alt={product.strCategory}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                  }}
                />
                {/* Kategori */}
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.strCategory}
                  </span>
                </div>
              </div>............
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className=" text-center font-semibold text-gray-900 mb-2 line-clamp-2 text-lg">
                  {product.strCategory}
                </h3>
                
                <p className="text-gray-600 text-xs mb-3 line-clamp-3">
                  {product.strCategoryDescription}
                </p>
                
                <button className="w-full mt-3 bg-orange-500 text-white py-2 rounded-lg hover:bg-red-400 transition-colors text-sm font-medium">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {foods.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No foods found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
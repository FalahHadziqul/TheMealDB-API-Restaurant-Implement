# D’lios - The World’s Culinary At Its Finest

Welcome to **D’lios**! This web app lets you explore food categories and regional cuisines from around the world, discover recipes, and view detailed meal instructions—all powered by [TheMealDB](https://www.themealdb.com/).

## Features

- **Hero Banner**: Eye-catching landing section with a call to action.
- **Explore Categories**: Browse meals by category with images and descriptions.
- **Explore Regional**: Discover meals by region/cuisine.
- **Meal Details Popup**: Click "Show Recipe" for a detailed modal with ingredients, instructions, and YouTube tutorials.
- **Responsive Design**: Works great on desktop and mobile.
- **Loading & Error States**: User-friendly feedback while fetching data.

## Tech Stack

- **React** (with hooks)
- **React Router**
- **Tailwind CSS**
- **TheMealDB API**
- **Lucide React** (icons)

## Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

4. **Open in your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## 📁 Project Structure

```
src/
  components/    # Reusable UI components (Hero, Navbar, GridCategories, etc.)
  pages/         # Page components (Home, ExploreCategories, ExploreRegional, CategoryDetail)
  data/          # Local JSON data (categories, regions)
  index.css      # Tailwind CSS styles
  main.jsx       # App entry point and routing
```

## 🙌 Credits

- [TheMealDB](https://www.themealdb.com/) for the free meal API and images.
- [Lucide Icons](https://lucide.dev/) for icons.
- [Tailwind CSS](https://tailwindcss.com/) for styling.

---

> _Feel free to fork, contribute, or open issues!_

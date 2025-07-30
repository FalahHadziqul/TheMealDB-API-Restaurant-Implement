import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={`bg-white w-full p-2 fixed top-0 left-0 z-50 shadow`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">D'lios!</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-black hover:text-red-500">Home</Link></li>
            <li><Link to="/exploreCategories" className="text-black hover:text-red-500">Explore</Link></li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
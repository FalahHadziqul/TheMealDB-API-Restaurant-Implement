
const Navbar = () => {
  return (
    <nav className="bg-white w-full p-2 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">D'lios!</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-black hover:text-red-500">Home</a></li>
            <li><a href="#" className="text-black hover:text-red-500">About</a></li>
            <li><a href="#" class="text-black hover:text-red-500">Contact</a></li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
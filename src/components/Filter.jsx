import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <div className=" w-full my-8">
      <div className="mt-2 flex gap-4 justify-center w-fullitems-center">
        <div className={` px-5 rounded-full border border-gray-500 bg-red shadow hover:bg-gray-100 ${location.pathname === '/exploreCategories' ? 'bg-gray-200' : 'bg-white'}`}>
          <button onClick={() => navigate("/exploreCategories")} className="w-full text-center text-lg"> Categories</button>
        </div>
        <div className={` px-5 rounded-full border border-gray-500 bg-red shadow hover:bg-gray-100 ${location.pathname === '/exploreRegional' ? 'bg-gray-200' : 'bg-white'}`}>
          <button onClick={() => navigate("/exploreRegional")} className={'w-full text-center text-lg'}> Regional</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
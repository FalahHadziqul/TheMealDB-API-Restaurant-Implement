import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import { useLocation } from 'react-router-dom';

function Explore() {
  const location = useLocation();
  const isTransparent = location.pathname === "/explore";
  return (
    <>
      <Navbar isTransparent={isTransparent}/>

      <Searchbar />
    </>
  )
}

export default Explore
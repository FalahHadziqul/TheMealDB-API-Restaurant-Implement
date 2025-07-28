import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const isTransparent = location.pathname === "/explore";
  return (
    <>
      <Navbar isTransparent={isTransparent}/> 

      <Hero />
    </>
  )
}

export default Home

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  return (
    <>
      <Navbar /> 

      <Hero />
    </>
  )
}

export default Home

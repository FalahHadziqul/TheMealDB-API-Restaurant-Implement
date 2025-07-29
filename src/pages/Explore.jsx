import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Grid from '../components/Grid'
import { useLocation } from 'react-router-dom';

function Explore() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Searchbar />

      <Grid />
    </>
  )
}

export default Explore
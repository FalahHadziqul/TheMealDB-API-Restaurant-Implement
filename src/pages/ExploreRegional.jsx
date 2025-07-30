import Navbar from '../components/Navbar'
import Options from '../components/Options'
import GridRegional from '../components/GridRegional'
import Filter from '../components/Filter'
import { useLocation } from 'react-router-dom';

const ExploreRegional = ()=> {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Options />

      <Filter />

      <GridRegional />
    </>
  )
}

export default ExploreRegional
import Navbar from '../components/Navbar'
import Options from '../components/Options'
import GridCategories from '../components/GridCategories'
import Filter from '../components/Filter'
import { useLocation } from 'react-router-dom'

const ExploreCategories = ()=> {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Options />

      <Filter />

      <GridCategories />
    </>
  )
}

export default ExploreCategories
import Hero from "../../components/hero/hero";
import CenteredContent from "../../components/centeredContent/centeredContent";
import LatestListings from "../../components/latestListings/latestListings";

function Home(){
  return (
    <div>
      Home
      <Hero/>
      <CenteredContent>
        <LatestListings type="sprzedaż"/>
      </CenteredContent>
    </div>
  )
}

export default Home;

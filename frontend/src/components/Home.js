
import Products from "./Products";

import FeatureProducts from "./featureProduct";
import { Helmet } from "react-helmet-async";
import Foots2 from "./foot2";


const Home = () => {

  return (
    <>
      <Helmet>
        <title>lanhnb.store</title>
      </Helmet>
      <div className="row" style={{marginLeft:"auto", marginRight:"auto"}}><Products /></div>
      <div className="row"><FeatureProducts /></div>
      <Foots2/>
      
    
        
        
         </>
  )
}


export default Home;

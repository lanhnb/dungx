import styled from "styled-components";
import Sort from "./Sort";
import ProductList from "./ProductList";

import React, { useState } from 'react'


const Productss = () => {

 


  return (
    <Wrapper>
      <div id="home11" className="w3-container">
        
        <div className="w3-col m12 s12">
          <section className="product-view--sort">
            <div className="sort-filter">
              <Sort />
            </div>
            <div className="main-product">
              <ProductList />
            </div>
          </section>
        </div>
      </div>
   
    </Wrapper>
  )
};

const Wrapper = styled.section`
 
  
  @media screen and (min-width: 769px) {
    .productCaroul{
      display:none;
    }
    .filter1{
      display:block
      min-width:1100px;
  }
  .b11{
    display:none;
  }
}
  
  @media screen and (min-device-width: 481px) and (max-device-width: 768px) { 
      /* STYLES HERE */
  }
  
  @media only screen and (max-device-width: 480px) {
    .fillSm{
      display:none
    }
    
  .b11{
    display:block;
  }
  }
  .container.grid.grid-filter-column {
    padding: 0 5px 0px;
}
  .grid-filter-column {
    grid-template-columns: 190px 1fr;
  }
  

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
  `;
export default Productss
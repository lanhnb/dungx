import styled from "styled-components";
import Grid from '@mui/material/Grid';



import PageNavigation from "../../PageNavigation";
import MyImage from "../../MyImage";
import FormatPrice from "../../FormatPrice";
import Star from "../../Star";

// import AddToCart from "./AddToCart";



import { useState, useEffect } from "react";

import axios from "axios";
import { setHeaders, url } from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const ProductDetail = () => {

  const params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id: alias, name, price, priceOff, description, stock, stars, image, category, reviews } = product;
  
  useEffect(() => {
    setloading(true)
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/products/find/${params.id}`, setHeaders());

        setProduct(res.data);
      } catch (err) {
        console.log(err)
      }
      setloading(false)

    }
    fetchData()
  }, [params.id])

  
  return (
    <Wrapper>
      {loading ? (
        <p> Loading...</p>
      ) : (
        <>
          <PageNavigation title={name} />
          <Container>

            <div id="home11" className="w3-col m12 s12">
              <div className="w3-col m6 s12">
                <div className="product-images1">
                  
                  <MyImage imgs={image} />

                </div>
              </div>
              <div className="w3-col m6 s12">
                <div className="product-data">
                  <h3>Name: {name}</h3>
                  <Star stars={stars} views={reviews} />
                  
                  <p className="product-data-price">
                    MRP:
                    <del>
                      <FormatPrice price={price} />
                    </del>
                  </p>
                  <p className="product-data-price product-data-real-price">
                    Del of the Day: <FormatPrice price={priceOff} />
                    
                  </p>
                  <p className="des">Short detail: {description}...</p>
                  <p>In stock: <b>{stock}</b></p>
                  <p>ID: <b>{alias}</b></p>
                  <p>Brand: <b>{category}</b></p>
                  <hr />
                  
                </div>
              </div>
            </div>
          </Container>
        </>

      )};
    </Wrapper>
  )
};
const Container = styled.div`
  width: 100%;
  padding: 1px 1px;

`;
const Wrapper = styled.section`

@media screen and (min-width: 769px) {
  .grid-two-column{
    display: grid;
    grid-template-columns: 1fr 1fr;
    img{
      width:453px;
    }
  }
}

@media screen and (min-device-width: 481px) and (max-device-width: 768px) { 
    /* STYLES HERE */
}

@media only screen and (max-device-width: 480px) {
  
  }
  
  
  .grid-two-column{
    display: grid;
    grid-template-columns: 1fr 1fr;
    img{
      width:453px;
    }
  }
  
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left:50px;
    gap: 2rem;
    .des{
      text-align: justify;
    
    }
    hr{
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
    .btn{
      background-color: ${({ theme }) => theme.colors.btn};
      padding:5px;
      color:#fff;
      font-size: 15px;
    }
  }
 

    

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;
export default ProductDetail;
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import PageNavigation from "./PageNavigation"
import MyImage from "./MyImage";
import FormatPrice from "./FormatPrice";
import Star from "./Star";

// for rating
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
//end rate

import { useState, useEffect } from "react";

import axios from "axios";
import { setHeaders, url } from "./api";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "./slices/cartSlice";


import { toast } from 'react-toastify';
import { getError } from './payment/utils';
import Foots2 from "./foot2";


const SingleProduct = () => {

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart")
  }
  // for rating start

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [namec, setNamec] = React.useState("");
 
  const [emailorPhone, setEmailorPhone] = React.useState("");
  const [comment, setComment] = React.useState("");
 
  // for rate from
 
  const isTextareaDisable =comment.length === 0;

  const handleComment = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post(`${url}/comment`,
        {
          namec,
          emailorPhone,
          comment,
          rate:value,
         
        }, setHeaders()
       
      );
      console.log(data)
     toast.info("Mess success");
      
    } catch (err) {
      toast.error(getError(err));
      console.log(getError(err))

    }
  
  
  };

return (


  <Wrapper>
    <Helmet>
      <title>{alias}</title>
    </Helmet>
    {loading ? (
      <p> Loading...</p>
    ) : (
      <>

        <div id="home11">

          <div className="w3-container">
            <PageNavigation title={name} />
            <div className="w3-col m6 s12">
              <div className="product-images1">
                {/* <img src={image?.url} alt={name}/> */}
                <MyImage imgs={image} />

              </div>
              <div className="w3 container rate">
                <div className="row">


                  <form onSubmit={handleComment} style={{ border: "1px solid #dee2e6", borderRadius: "2px", marginTop:"20px" }}>
                    <div className="w3 d-flex">
                     <i style={{marginLeft:"20px"}}> Rate and send us your idea &nbsp;</i>
                      <Box
                        sx={{
                          width: 200,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Rating
                          name="hover-feedback"
                          value={value}
                          precision={0.5}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                      </Box>

                    </div>
                    <div className="form-row">
                      <div className="w3 d-flex">
                        <div className="col col-md-6" style={{ margin: "2px" }}>

                          <textarea value={comment} onChange={(e) => setComment(e.target.value)} class="form-control" id="exampleFormControlTextarea1" placeholder="Comment here" rows="3"></textarea>
                        </div>
                        <div className="col-md-6" style={{ margin: "2px", }} >
                          <div className="w3 d-flex">

                            <div className="col col-md-6" style={{ margin: "2px", width: "49%" }}>

                              <input type="text" class="form-control" id="inputPassword4" placeholder="Name" onChange={(e) => setNamec(e.target.value)}
                                required />
                            </div>
                            <div className="col col-md-6" style={{ margin: "2px", width: "49%" }}>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Email or Phone number " onChange={(e) => setEmailorPhone(e.target.value)}
                                required />
                            </div>
                          </div>

                          <div style={{ margin: "2px" }}>
                            <button disabled={isTextareaDisable} style={{ border: "1px solid #dee2e6", width: "100%", borderRadius: "5px" }} >Send</button>
                          </div>

                        </div>


                      </div>


                    </div>


                  </form>
                </div>

              </div>
            </div>
            <div className="w3-col m6 s12">
              <div className="product-data">
                <h1 id="named">{name}</h1>
                <Star stars={stars} views={reviews} />
                <p>{reviews} Preview</p>
                <p className="product-data-price">
                  MRP:
                  <del>
                    <FormatPrice price={price} />
                  </del>
                </p>
                <p className="product-data-price product-data-real-price">
                  Sell of the Day: <FormatPrice price={priceOff} />

                </p>
                <p className="des">{description}...</p>
                <p>In stock: <b>{stock}</b></p>
                <p>ID: <b>{alias}</b></p>
                <p>Brand: <b>{category}</b></p>
                <hr />
                <button className="btnRe" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
              <div className="khoang" style={{ "height": "100px" }}>
              </div>
            </div>

          </div>

        </div>
      </>


    )
    }
     <Foots2/>
  </Wrapper >
 
)
};

const Wrapper = styled.section`
span.MuiRating-decimal.css-34he1w-MuiRating-decimal {
  font-size: 23px;
}


#named{
  text-transform: capitalize;
  font-variant-caps: all-petite-caps;
  color: #285ea6;
  font-size:30px;
}
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
      border: 0.1rem solid red;
      margin-top:-15px;
      
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
  .btnRe{
    background-color:rgb(0 0 0 /0%);
    border: 0.1rem solid rgb(98 84 243); 
    color: gray;
    padding:5px;
    border-radius:5px;
    margin-top:-24px;
}
.btnRe:hover{
  background-color: ${({ theme }) => theme.colors.btn};
  color:white;
}
`;
export default SingleProduct;
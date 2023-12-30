import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./payment/LoadingBox";
import MessageBox from "./payment/MessageBox";
import MyImage3 from "./MyImage3"


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { url } from "./api";

// import data from '../data';

const reducer = (state, action) => {



    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, products: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function NhadatScreen() {

    const navigate = useNavigate();
    const [{ loading, error }, dispatch] = useReducer(reducer, {
        nhadats: [],
        loading: true,
        error: "",
    });
    const [nhadat, getNhadats] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get(`${url}/nhadats`);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                getNhadats(result.data);

            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }


        };
        fetchData();
    }, []);

    //filter


    let mua = nhadat?.filter((items) => items.categoryd === "Mua")
    let ban = nhadat?.filter((items) => items.categoryd === "Ban")




    return (
        <Wrapper>
            <div id="home11" className="w3 bg-light">
                <div style={{ marginTop: "15px" }} className="w3 container">

                    <Helmet>
                        <title>Labor Service</title>
                    </Helmet>

                    <div className="row">
                        <div className="w3-col s12 m8">
                            {nhadat.slice(0, 3).map((ite) => (
                                <>
                                    <NavLink to={`/singlenhadat/${ite._id}`}>
                                        <div className="w3-col s4 m4">
                                            <Card.Img variant="top" src={ite.image[0]?.url} style={{ width: "100%", marginTop: "10px" }} />

                                        </div>
                                    </NavLink>
                                    <div className="w3-col s8 m8">
                                        <div className="info">
                                            <h2 id="named"> {ite.named}</h2>
                                            <p> &#10095;<b> Dien tich:</b> {ite.area}</p>
                                            <p> &#10095;<b> Dia chi:</b>  {ite.address}</p>
                                            <p> &#10095;<b> Price:</b>  {ite.priced}</p>
                                            <p> &#10095;<b> Price Off:</b> {ite.priceOffd}</p>
                                            <p >&#10095;<b> Huong:</b> {ite.huongd}</p>
                                            <p> &#10095; <b>Ngay dang:</b>  {moment(ite.createdAt).fromNow()}</p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div id="pkh" className="w3-col m4">
                            <div className="info1">
                                <h2 id="named"> top phan khuc tieu bieu </h2>
                                <p> &#10095;<b> Dien tich:</b> </p>
                                <p> &#10095;<b> Dia chi:</b>  </p>
                                <p> &#10095;<b> Price:</b>  </p>
                                <p> &#10095;<b> Price Off:</b> </p>
                                <p >&#10095;<b> Huong:</b> </p>
                            </div>
                            <div className="info2">
                                <h2 id="named"> top chu dau tu tieu bieu </h2>
                                <p> &#10095;<b> Dien tich:</b> </p>
                                <p> &#10095;<b> Dia chi:</b>  </p>
                                <p> &#10095;<b> Price:</b>  </p>
                                <p> &#10095;<b> Price Off:</b> </p>
                                <p >&#10095;<b> Huong:</b> </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div className="w3 container"><h3> Nha dat in lanhnb.store</h3></div>

            <div className="w3 container d-sm-block d-md-flex">
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (

                    <div className="w3-col s12 m8" >
                        <div>
                            <h4>Mua</h4>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}

                                loop={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                                breakpoints={{
                                    430: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                }}
                            >
                                {
                                    mua.map((item) => (
                                        <SwiperSlide>

                                            <Card style={{ margin: "2px" }}>
                                                <NavLink to={`/singlenhadat/${item._id}`}>
                                                    <Card.Img variant="top" src={item.image[0]?.url} style={{ width: "100%" }} />
                                                </NavLink>
                                                <Card.Body>
                                                    <Card.Title>{item.named}</Card.Title>
                                                    <Card.Text>
                                                        {item.area}
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>

                                        </SwiperSlide>
                                    ))

                                }
                            </Swiper>
                        </div>
                        <div>
                            <h4>Ban</h4>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    430: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                }}
                                loop={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {
                                    ban.map((items) => (
                                        <SwiperSlide>

                                            <Card style={{ margin: "2px" }}>
                                                <NavLink to={`/singlenhadat/${items._id}`}>
                                                    <Card.Img variant="top" src={items.image[0]?.url} style={{ width: "100%" }} />
                                                </NavLink>
                                                <Card.Body>
                                                    <Card.Title>{items.named}</Card.Title>
                                                    <Card.Text>
                                                        {items.area}
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>

                                        </SwiperSlide>
                                    ))

                                }
                            </Swiper>

                        </div>
                    </div>


                )}

            </div>



        </Wrapper >
    );

}



export default NhadatScreen;
const Wrapper = styled.div`
#named{
    text-transform: capitalize;
    font-variant-caps: all-petite-caps;
    color: #285ea6;
    font-size:30px;
}
.info{
    margin-left:3px;
    background:#ffff;
    font-family: "Roboto", sans-serif;
    p{font-size:15px;}
    padding-left:10px;
}
.info1, .info2{
    padding-left:10px;
    background:#ffff;
    font-family: "Roboto", sans-serif;
    p{font-size:15px;}

}
tr.MuiTableRow-root.MuiTableRow-head.css-1q1u3t4-MuiTableRow-root {
  font-size: 15px;
}

th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1ygcj2i-MuiTableCell-root {
  font-size: 15px;
}
.btnR, .bdRo{
  padding:5px;
  background-color:rgb(0 0 0 /0%);
  border: 0.1rem solid gray; 
  border-radius:5px;
  color: gray;
  margin-top:5px;
  font-size:15px;
}
.btnR:hover{
  background-color: ${({ theme }) => theme.colors.btn};
  color:white;
}  
@media only screen and (max-device-width: 430px) {
  #pkh{
    display:none;
  }
    
}
@media screen and (min-width: 769px) {
  #bang1{
    margin-left:10px;
  }
`;  

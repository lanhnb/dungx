import React from "react";

import { styled } from "styled-components";
import moment from 'moment';
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';

// import required modules


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { url } from "./api";


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


const FeatureProducts = () => {

    const [{ loading }, dispatch] = useReducer(reducer, {
        xklds: [],
        nhadats: [],
        loading: true,
        error: "",
    });
    console.log(loading)
    const [xkld, getXklds] = useState([]);
    const [nhadat, getNhadats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const result = await axios.get(`${url}/xklds`);
                const resultd = await axios.get(`${url}/nhadats`);
                dispatch({ type: "FETCH_SUCCESS", payload: result.data });
                dispatch({ type: "FETCH_SUCCESS", payload: resultd.data });
                getXklds(result.data);
                getNhadats(resultd.data)

            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: err.message });
            }


        };
        fetchData();
    }, []);


    return (


        <Wrapper>
            <div className="w3 container">
                <Row>
                    <div className="intro-data">Check Now</div>
                    <div className="common-heading1"><b>Our Feature Service</b></div>
                    <h3 id="h3tr" >BẤT ĐỘNG SẢN </h3>
                    <h3>Tìm kiếm các Cơ hội đầu tư tại Lanhnb.store</h3>
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
                                slidesPerView: 4,
                            },
                        }}
                        loop={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >


                        {
                            nhadat.map((xk) => {

                                return (
                                    <SwiperSlide >
                                        <NavLink to={`/singlenhadat/${xk._id}`}>
                                            <Col className="xk1"  >
                                                <Card style={{ margin: "2px" }}>
                                                    <Card.Img variant="top" src={xk.image[0].url} style={{ width: "100%" }} />
                                                    <Card.Body>
                                                        <Card.Title>{xk.named}</Card.Title>
                                                        <Card.Text>
                                                            <p>{xk.address}</p>
                                                            <div className="w3 d-flex justify-content-between">
                                                                <p>{xk.area}</p>
                                                                <p style={{ color: "red" }}><b>{xk.priced}</b></p>
                                                            </div>
                                                            <p style={{ fontSize: "12px" }}> <i>Post:  {moment(xk.createdAt).fromNow()}</i></p>
                                                        </Card.Text>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </NavLink>

                                    </SwiperSlide>

                                )
                            })

                        }
                    </Swiper>
                </Row>
                <Row >
                    <h3 id="h3tr">DỊCH VỤ XUẤT KHẨU LAO ĐỘNG</h3>
                    <h3>Việc làm tốt nhất đang được Lanhnb.store giới thiệu</h3>
                    <Swiper
                        autoplayc={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            430: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                        }}
                        loopc={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >

                        {
                            xkld.map((xk) => {

                                return (
                                    <SwiperSlide >
                                        <NavLink to={`/singlexkld/${xk._id}`}>
                                            <Col className="xk1"  >
                                                <Card style={{ margin: "2px" }}>
                                                    <Card.Img variant="top" src={xk.image[0].url} style={{ width: "100%" }} />
                                                    <Card.Body>
                                                        <Card.Title>Job:{xk.namex}</Card.Title>
                                                        <Card.Text>
                                                            <div className="w3 d-flex justify-content-between">
                                                                <p>Country: {xk.categoryx}</p>
                                                                <p>Salary: <b style={{color:"red"}}>{xk.salaryx}</b></p>
                                                            </div>

                                                           <p><i> Infor:{xk.descriptionx?.slice(1, 10)}</i></p>
                                                            <p style={{ fontSize: "12px" }}> <i>Post:  {moment(xk.createdAt).fromNow()}</i></p>
                                                        </Card.Text>

                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </NavLink>

                                    </SwiperSlide>

                                )
                            })
                        }
                    </Swiper>
                </Row>

            </div>


        </Wrapper >


    )
};

export default FeatureProducts;

const Wrapper = styled.section`
#h3tr{
    margin-top:20px;
    
    font-size:20px;
    text-transform: capitalize;
 
  color: #285ea6;
}
    
    
    padding: 10px 0px;
    background-color: rgb(246, 248, 250);
    figure {
        margin: unset;
    }
    
    
    figure, .xk1 {
        z-index:1;
        margin:2px 2px;
        width: auto;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        transition: 0.8s ease all;
        cursor: pointer;
        &:hover img {
            
            -webkit-transform: scale(1.1,1.1);
            max-width: 100%;
            opacity:0.8;
           
            
        }
        &::after{
            content: "";
            position: absolute;
            top: 0px;
            left: 0px;
            width: 0%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            transition: all 0.2s linear 0s;
            cursor: pointer;
        }
        img{
            margin:5px 2px;
            max-width: 95%;
            
            height: auto;
            transition: all 0.2s linear 0s;
            
        }
    
        }
    .btnRe{
        background-color:rgb(0 0 0 /0%);
        border: 0.1rem solid rgb(98 84 243); 
        color: gray;
    }
    .btnRe:hover{
        background-color: ${({ theme }) => theme.colors.btn};
        color:white;
      }    

`;
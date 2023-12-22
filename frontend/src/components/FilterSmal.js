import { useFilterContext } from "./FilterContext"
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "./FormatPrice";
import { Button } from "../styles/Button";
import React, { useState, useRef } from 'react'; // 

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Pagination, Navigation } from 'swiper/modules';


const FilterSmal = () => {
    const {
        filters: { text, category, color, price, maxPrice, minPrice },
        updateFilterValue,
        all_products,
        clearFilters,
    } = useFilterContext();

    // get the unique values of each property
    const getUniqueData = (data, attr) => {
        let newVal = data.map((curElem) => {
            return curElem[attr];
        });

        if (attr === "colors") {

            return (newVal = ["All", ...new Set([].concat(...newVal))]);
            // newVal = newVal.flat();

        } else {
            return (newVal = ["All", ...new Set(newVal)]);
        }
    }

    // we need to have the individual data of each in an array format
    const categoryData = getUniqueData(all_products, "category");
    const companyData = getUniqueData(all_products, "company");
    const colorsData = getUniqueData(all_products, "colors");




    return (
        <Wrapper>
            <div className="productCaroul">


                <Swiper
                    pagination={{
                        type: 'progressbar',
                    }}
                    loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"

                >
                    <SwiperSlide><div className="col col-12">
                        <div className="filter-search">
                            <p className="byName">Filter by names</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input
                                    id="search"
                                    type="text"
                                    name="text"
                                    value={text}
                                    placeholder="Search"
                                    onChange={updateFilterValue}

                                />
                            </form>
                        </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div className="col col-12">
                        <div className="filter-category">
                            <h3> Category</h3>
                            <div className="category_btn">
                                {categoryData.map((curElem, index) => {
                                    return (<button
                                        key={index}
                                        type="button"
                                        name="category"
                                        value={curElem}
                                        onClick={updateFilterValue}
                                        className={curElem === category ? "active" : ""}
                                    >{curElem}</button>
                                    );
                                })

                                }
                            </div>

                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide><div className="col col-12">
                        <div className="filter-company">
                            <h3> Company</h3>
                            <form action="#">
                                <select
                                    style={{ borderRadius: "5px", border: "1px solid rgba(98, 84, 243, 0.5)" }}
                                    name="company"
                                    id="company"
                                    className="filter-company-select"
                                    onClick={updateFilterValue}>
                                    {
                                        companyData.map((curElem, index) => {
                                            return (
                                                <option value={curElem} name="company" key={index}>{curElem}</option>
                                            )

                                        })
                                    }

                                </select>
                            </form>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide><div className="col col-12">
                        <div className="filter-color1">
                            <h3> Colors</h3>
                            <div className="filter-color-style">
                                {colorsData.map((curColor, index) => {
                                    if (curColor === "All") {
                                        return (
                                            <button
                                                key={index}
                                                value={curColor}
                                                type="button"
                                                name="color"
                                                // style={{ backgroundColor: curColor }}
                                                className="btnStyle1"
                                                onClick={updateFilterValue}>
                                                All
                                            </button>
                                        );
                                    }
                                    return (
                                        <button
                                            key={index}
                                            value={curColor}
                                            type="button"
                                            name="color"
                                            style={{ backgroundColor: curColor }}
                                            className="btnStyle"
                                            onClick={updateFilterValue}>
                                            {color === curColor ? <FaCheck className='checkStyle' /> : null}
                                        </button>
                                    );

                                })}
                            </div>
                        </div>
                    </div></SwiperSlide>
                    <SwiperSlide><div className="col col-12">
                        <div className="filter_price">
                            <h3>Price</h3>
                            <p><FormatPrice price={price} /></p>
                            <p>
                                <input
                                    name="price"
                                    type="range"
                                    min={minPrice}
                                    max={maxPrice}
                                    value={price}
                                    onChange={updateFilterValue} />
                            </p>
                        </div>


                    </div></SwiperSlide>
                    <SwiperSlide>

                        <div className="Clear_button">
                            <p>Clear Filter</p>
                            <Button className="btn" onClick={clearFilters}>Clear Filter</Button>

                        </div>
                    </SwiperSlide>

                    {/* <SwiperSlide></SwiperSlide> */}

                </Swiper>







            </div>


        </Wrapper >





    )
};
export default FilterSmal;

const Wrapper = styled.section`
.fmDymx {
    margin-top: 1rem;
}
.swiper-pagination.swiper-pagination-progressbar.swiper-pagination-horizontal {
    background: none;
    display:none;
}
button.b11 {
    float: right;
    margin-right: -383px;
    margin-top: -38px;
    border: none;
    font-size: 29px;
    background:none;
}
.main-product {
    margin-top: -42px;
}

.productCaroul {
    width: 368px;
    margin-left: 0px;
}
.swiper-wrapper {
    margin-left: 0px;
}
.swiper-button-prev {
    margin-top: -54px;
    color:#eeeeee;
    
    
}
.byName{
    font-size: 18px;
    margin-top:10px;
}

.swiper-button-next.swiper-button-disabled {}

.swiper-button-next {
    margin-top: -54px;
    color:#eeeeee;
}



.swiper-slide {
    text-align: center;
    font-size: 11px;
    background: #fff;
  
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    width:390px;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    
    h3{
        padding: 2rem 0;
        font-size: bold;
    }
    .filter-category{
        margin-top: -24px;
        margin-left:20px;
        margin-right:30px;
        .category_btn{
            display:inline;
            
            button{
            background:none;
            border:none;
            cursor:pointer;
            text-align:left;
            font-size:16px;
            margin-left:30px;
           }
        }
        
        
    }
    .filter_price {
        margin-top: -24px;
    }
    input#search {
        width:213px;
    }
    .filter-search{
        margin-top:30px
        input{           
            padding: 4px;
            
            border-radius:5px;
        }
        font-size:15px;
    }

    .filter-color1{
        margin-top: -24px;
        margin-left:20px;
        .filter-color-style{
            button.btnStyle {
                width:2rem;
                height:2rem;
                border:none;
                outline:none;
                cursor:pointer;
                border-radius:50%;
                margin-left:1rem;
            }
            button.btnStyle1{
                background:none;
                border:none;
                
            }
            .checkStyle{
                font-size: 1rem;
                color:#fff;
            }
            
        }
    }
    .filter-company{
        margin-top: -24px;
        margin-left:30px;
        .filter-company-select{
            cursor:pointer;
            option{
                cursor:pointer;
            }
            
        }
        select#company {
            width: 200px;
            padding:5px;
            
           color:gray;
           font-size:14px;
        }
        

    }
    .Clear_button{
        font-size:18px;
        .btn{
            background-color:red;
            width: 150px;
        }
    }
  

.productCaroul{
    position: ralative;
    overflow: hidden;
    padding: 0px;
}
.producContainer{
    padding:0 10px;
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
}


`;








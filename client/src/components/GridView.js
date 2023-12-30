import React from "react";
import styled from "styled-components"
import Product from "./Product"
import 'w3-css/w3.css';
import Grid from '@mui/material/Grid';
import { useState } from 'react'
import { BsFillGridFill, BsList } from "react-icons/bs";
import FilterSmal from "./FilterSmal";
import FilterSection from "./FilterSection";
import { FcClearFilters } from "react-icons/fc";
import { FcFilledFilter } from "react-icons/fc";

const GridView = ({ products }) => {
    const { useState, useEffect } = React;
    const [isVisible, setIsVisible] = useState(false);
    const [height, setHeight] = useState(0)
    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])


    const [isShown, setIsShown] = useState(false);
    const [hideF, sethideF] = useState(true)
    const [hideFi, sethideFi] = useState(false)
    const handleClick = event => {
        // 👇️ toggle shown state
        setIsShown(current => !current);

        // 👇️ or simply set it to true
        // setIsShown(true);
    };
    const listenToScroll = () => {
        let heightToHideFrom = 300;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    const ViewMore = () => {
        sethideFi(true);
        setIsVisible(false);
    }
    return (
        <Wrapper>
            {/* <div id="height">
                <b>height: {height} - {isVisible ? "show" : "hide"}</b>
            </div> */}

            <div className="row1">


                <button className="b11" onClick={handleClick}><span onClick={() => sethideF(!hideF)}>
                    {hideF ? <FcClearFilters /> : <FcFilledFilter />}
                </span></button>
            </div>
            <div className="row">
                <div className="w3-col ">


                    <div className="w3-col m2 s12 ">
                        {/* 👇️ show elements on click */}
                        {!isShown && (
                            <div className="container grid grid-filter-column">
                                <div className="filter1" id="filter1">


                                    <FilterSmal />
                                    <div className="fillSm">
                                        <FilterSection />
                                    </div>

                                </div>
                            </div>
                        )}

                    </div>
                    <div className="w3-col m10 s12 ">
                        {products.slice(0, 11).map((curElem) => {
                            return <div className="w3-col m3 s6"><Product key={curElem.id} {...curElem} />
                            </div>
                        })}
                       
                    {hideFi &&
                        <div id="hide">{products.slice(12, 30).map((curElem) => {
                            return <div className="w3-col m3 s6"><Product key={curElem.id} {...curElem} />
                            </div>
                        })}
                        </div>
                    }
                     {isVisible
                            &&
                            <button id="btn1" className="btnRe" onClick={ViewMore}>
                                View more products
                            </button>


                        } </div>
                </div>
            </div>

        </Wrapper>
    );
};
export default GridView;

const Wrapper = styled.section`
#height {
    position: fixed;
    top:5vh;
    
  }
  #btn1{
    float:right;
    z-index:100000;
    
  }
  .btnRe{
    background:none;
    border:none; 
    color: gray;
    padding:3px;
    font-style: italic;
    
}
.btnRe:hover{
  color: ${({ theme }) => theme.colors.btn};
  
}
@media screen and (min-width: 769px) {
    
}
  
  @media screen and (min-device-width: 481px) and (max-device-width: 768px) { 
   
  }
  
  @media only screen and (max-device-width: 480px) {
    
   
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
.name{
    margin-left:10px;
}
.gia{
    margin-right:10px;
}
display:flex;
justify-content: space-between;

margin-top: 5rem;
.cart{
    background-color: aliceblue;
    border-radius: 12px;
    margin:2px;

}
.sorting-list--grid{
    display: flex;
    gap: 2rem;

    .sort-btn{
        padding: 0.2rem 1rem;
        border:none;
        display:flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;

    }
    .icon{
        font-size: 1.6rem;
    }
    .active{
        background-color:#fff;
        color: #fff;

    }
}
figure {
    margin:2px 2px;
    width: auto;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear 0s;
    &:hover img {
        transform: scale(1.2);
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
        max-width: 100%;
        margin-top: 1.5rem;
        height: 20rem;
        transition: all 0.2s linear 0s;
        
    }

    }

.btn{
    background-color: ${({ theme }) => theme.colors.btn};
    padding:5px;
    color:#fff;
    font-size: 15px;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    &:hover{
        background-color: rgb(98 84 243 );
        opacity:0.6;
        color:red;
        font-size: 17px;


    }
    
    }
   
`;
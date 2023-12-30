import React from "react";
import styled from "styled-components"
import { useFilterContext } from "./FilterContext"
import FormatPrice from "./FormatPrice";
import { NavLink } from "react-router-dom";
const { useState, useEffect } = React;

const ListView = ({ products }) => {
    const { sorting } = useFilterContext();
    const [hideFi, sethideFi] = useState(false)
    const [btn, setshowBtn] = useState(true)

    const btnshow=()=>{
        setshowBtn(false)
        sethideFi(true)
    }
    return (
        <Wrapper >
            <div className="w3-col">
                <div className="row1">
                    <div className="sort-selections">
                        <form action="#">
                            <label htmlFor="sort"></label>
                            <select name="sort" id="sort" className="sort-selection--style" onClick={sorting}>
                                <option value="lowest">Price(lowest)</option>
                                <option value="#" disabled></option>
                                <option value="highest">Price(highest)</option>
                                <option value="#" disabled></option>
                                <option value="a-z">Price(a-z)</option>
                                <option value="#" disabled></option>
                                <option value="z-a">Price(z-a)</option>
                            </select>

                        </form>
                    </div>

                </div>
            </div>

            <div className="row" id="liVie">
                {products.slice(0, 3).map((curElem) => {
                    const { _id, name, image, price, description } = curElem;
                    return (
                        <div className="w3-col m12 d-flex" id="liV">
                            <div className="w3-col m4" id="liVi">
                                <figure>
                                    <img src={image[0]?.url} alt={name} />
                                </figure>
                            </div>
                            <div className="w3-col m8">

                                <div className="cart-data">
                                    <h3>{name}</h3>
                                    <p><FormatPrice price={price} /></p>
                                    <div className="des">{description}...</div>
                                    <NavLink to={`/singleproduct/${_id}`}>
                                        <button className="btn_read_more">Read more...</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>


                    )
                    //  <Product key = {curElem.id} {...curElem} />
                })}

                {hideFi &&
                    <div>
                        {products.slice(4, 12).map((curElem) => {
                            const { _id, name, image, price, description } = curElem;
                            return (
                                <div className="w3-col m12 d-flex" id="liV">
                                    <div className="w3-col m4" id="liVi">
                                        <figure>
                                            <img src={image[0]?.url} alt={name} />
                                        </figure>
                                    </div>
                                    <div className="w3-col m8">

                                        <div className="cart-data">
                                            <h3>{name}</h3>
                                            <p><FormatPrice price={price} /></p>
                                            <div className="des">{description}...</div>
                                            <NavLink to={`/singleproduct/${_id}`}>
                                                <button className="btn_read_more">Read more...</button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                }

                {btn &&
                    <button id="btn1" className="btnRe" onClick={btnshow}>
                        View more products
                    </button>
                }
            </div>




        </Wrapper>

    );
}
export default ListView;
const Wrapper = styled.div`
.sort-selections{
    float:right;
    padding:5px;
}
#liV{
    background-color:rgb(0 0 0 /0%);
    border: 0.1rem solid gray; 
    margin:10px;
    border-radius:5px;
}
#liVi{
    background-color:rgb(0 0 0 /0%);
    
    margin:10px;
    
}
#liVie{
    padding: 10px;
}

.grid{
    gap:3.2rem
}
.cart{
    border:0.1rem solid rgba( 170, 170, 170, 0.4)
    
}
.grid-two-column{
    grid-template-columns:repeat(2, 1fr);
}
.figure {margin:0}

display:grid;
justify-content: space-between;
padding-right:50px;
margin-top: 5rem;
.des{
    font-size:15px;
    justify-content: space-between;
    
}
figure {
    margin:0px;
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
        right:0;
    }
    img{
        max-width: 90%;
        margin-top: 1.5rem;
        height: 20rem;
        transition: all 0.2s linear 0s;
    }

    }
}

.cart-data{
   
    .btn_read_more{
        background-color:rgb(0 0 0 /0%);
        border: 0.1rem solid rgb(98 84 243);
        
        padding:10px;
        display:flex;
        justify-content:center;
        align-items:centerl
        cursor:pointer;

        &:hover{
            background-color:rgb(98 84 243);
            color:#fff;
            border-radius:5px;
            cursor:pointer;
        }
    }
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
        background-color:;
        color: #fff;

    }
}
.btnRe{
    float:right;
    z-index:100000;
    
  }
#btn1{
    background-color:rgb(0 0 0 /0%);
    border:none;
    color:gray;
    font-size: 15px;
    font-style: italic;
   
    
    cursor: pointer;
    &:hover{
        color: ${({ theme }) => theme.colors.btn};
      }
    
    }

`;

import React, { useState } from 'react';
import styled from "styled-components";
import { FaCheck } from 'react-icons/fa';
import CartAmountToggle from './CartAmountToggle';
import { NavLink } from 'react-router-dom';
import {Button} from "../styles/Button"


const  AddToCart= ({product})=> {
    const { colors, stock } = product;
    const [color, setColor] = useState(colors[0]);

    const [amount, setAmount] = useState(1)

    const setDecrease=()=>{
        amount > 1 ? setAmount(amount-1) : setAmount(1);
    };

    const setIncrease=()=>{
        amount < stock ? setAmount(amount + 1) : setAmount(stock)
    };


    return <Wrapper>
      <div className='colors'>
        <p>
            Colors:
            {colors.map((curColor, index)=>{
                return <button key={index} style={{backgroundColor:curColor}} 
                className={color=== curColor ? "btnStyle active": "btnStyle"}
                 onClick={()=>setColor(curColor)}>{color===curColor ? <FaCheck className='checkStyle'/>: null}
                 </button>;
            })}
        </p>

        </div>  
        {/* AddToCart */}
        <CartAmountToggle
            amount={amount}
            setDecrease={setDecrease}
            setIncrease={setIncrease}
        />

        <NavLink to="/cart">
            <Button className='btn'> Add To Cart </Button>

        </NavLink>
        
    </Wrapper>
};


export default AddToCart;
const Wrapper= styled.section`
    .colors{
        display:flex;
        justify-content: flex-start;
        align-items:center;
        opacity: 0.8;
        cursor:pointer;
        

       
    }
    .active{
        opacity:1;

    }
    .checkStyle{
        font-size: 1rem;
        color:#fff;
    }
    .btnStyle{
        width:2rem;
        height:2rem;
        background-color:#000;
        border:none;
        outline:none;
        opacity:0.8;
        cursor:pointer;
        border-radius:50%;
        margin-left:1rem;
        

        &:hover{
            opacity:1;
        }
    }
    .amount-toggle{
        display:flex;
        margin-left: 36px;
    }
    .faIcon{
        background-color: rgb(255 255 255);
        border:none;
        
    }
    .amount-style{
        font-size:20px;
        padding:10px;
    }
    
    
`;

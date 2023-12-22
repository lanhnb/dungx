import React from "react";
import {FaStar, FaStarHalfAlt} from "react-icons/fa";
import {AiOutlineStar} from "react-icons/ai";
import styled from "styled-components";

const Star = ({stars, views})=>{
    const ratingStar = Array.from({ length: 5}, (elem, index)=>{
        let number = index + 0.5;
        // debugger;
        return (
            <span key={index}>
                {stars >= index +1 ?( 
                <FaStar className="icon"/>
                ) : stars >= number ?(
                < FaStarHalfAlt className="icon"/>
                ):(
                < AiOutlineStar className="icon"/>
                )}
            </span>
            );
    });
    return (
        <Wrapper>
            <div className="icon-style">
                {ratingStar}
                <p>({views} customer reviews)</p>
            </div>
        </Wrapper>
    )
};
export default Star;

const Wrapper= styled.section`
    .icon-style{
        display:flex;
        gap:0.2rem;
        align-items:center;
        .icon{
            font-size: 2rem;
            color:orange;
        }
    }

`;
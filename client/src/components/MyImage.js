import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({imgs = [{ url: ""}]})=>{
    const [mainImage, setMainImage] = useState(imgs[0]);
    console.log("image", imgs)
    return (
        <Wrapper>
            
            <div className="grid-four-column">
                {
                    imgs.map((curElem, index)=>{
                        return(
                            <figure>
                                <img 
                                src={curElem.url} 
                                alt={curElem.filename} 
                                className="box-image--style"
                                key={index}
                                onClick={()=> setMainImage(curElem)}
                                />
                            </figure>
                        )

                    })
                }
                
            </div>
            {/* 2 nd column image */}
            <div className="main-screen">
                <img src={mainImage.url} alt={mainImage.filename}/>
            </div>
        </Wrapper>
    )
};

export default MyImage;

const Wrapper= styled.section`
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    gap: 1rem;

    .grid-four-column{
       
        img{
            max-width:100%;
            max-height:100%;
            cursor:pointer;
            
        }
        img:hover{
            opacity:0.8;
        }

    }
    .main-screen{
        display:flex;
        place-items:center;
        order:1;
        img{
            max-width:100%;
            box-shadow:${({theme})=>theme.colors.shadow};

        }
    }
    
    }
    @media (max-width:${({theme})=>theme.media.mobile}){
        display:flex;
        flex-direction:column;
        order:1;
        .grid-four-colum{
            grid-template-rows: 1fr;
            grid-template-columns: repeat(4, 1fr);
        }
    }
    
`;
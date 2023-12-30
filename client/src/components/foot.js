import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";



const Foots = () => {
    const { useState, useEffect } = React;
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);
    const [height, setHeight] = useState(0)
    

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 20;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            setIsVisible(true);
            setIsVisible1(true);
        } else {
            setIsVisible(false);
            setIsVisible1(false);
        }
    };

    return (
        <Wrapper>
        <div id="container">
            { isVisible1 &&
           
             <div id="hide2">
                {/* <b>height: {height} - {isVisible ? "show" : "hide"}</b> */}
                <img id='noel' src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1703157563/drrcqor2tcdwomfhthel.gif" className="" alt="logo" />
            </div> 
             }
           
        </div>
        </Wrapper>
    );

   
        
}
const Wrapper = styled.header`
#hide {
    position: fixed;
    bottom:0;
    width:100%;
    z-index:10000;
    
  }
  
  #hide2 {
    position: fixed;
    top:30vh;
    right:-60rem;
    z-index:20000;
    #noel{
        width: 50%;
        height: auto;
       
    }
    
  }
  
  #container {
    min-height:50px;
  }
  @media only screen and (max-device-width: 920px) {
    #hide2 #noel {
        width: 50%;
        height: auto;
      
        
}

@media only screen and (max-device-width: 430px) {
    #hide2 {
        width: 80%;
        height: auto;
        right:-25rem;
    }
        
       
   
}
    
  
`;
export default Foots;
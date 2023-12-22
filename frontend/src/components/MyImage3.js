
import styled from "styled-components";

const MyImage3 = ({ imgs = [{ url: "" }] }) => {


    return (
        <Wrapper>
            {
                imgs.slice(0, 1).map((curElem, index) => {
                    return (

                        <img
                            src={curElem.url}
                            alt={curElem.filename}
                            className="box-image--style"

                        />

                    )

                })
            }


        </Wrapper>
    )
};

export default MyImage3;

const Wrapper = styled.div`
          
    img{
        width:100%;
        height:100%;
        cursor:pointer;
        
    }
    img:hover{
        opacity:0.8;
    }`;
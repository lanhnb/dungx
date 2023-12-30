
import styled from "styled-components";

const MyImage2 = ({ imgs = [{ url: "" }] }) => {


    return (
        <Wrapper>

            <div className="">
                {
                    imgs.slice(1, 2).map((curElem, index) => {
                        return (
                            <figure style={{margin:'1px'}}>
                                <img
                                    src={curElem.url}
                                    alt={curElem.filename}
                                    className="picImag"
                                    key={index}

                                />
                            </figure>
                        )

                    })
                }

            </div>

        </Wrapper>
    )
};

export default MyImage2;

const Wrapper = styled.div`
          
    img{
        width:100%;
        height:100%;
        cursor:pointer;
        
    }
    img:hover{
        opacity:0.8;
    }
 
   
    
`;
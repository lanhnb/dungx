import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";



const Foots2 = () => {


    return (

        <Wrapper>





            <footer>
                <div id='foots' className="w3 container-fluid">
                    <div className="col-sm-4 text-center mx-auto">
                        <div className="mx-auto py-2 my-2">
                            <Link to="/"> <img src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695431219/logo/epiu3addc0ing9mk4l2p.png" style={{height: "60px", width:"60px;"}} className=""
                                alt="Cinque Terre" /></Link>
                            <b style={{marginLeft:"20px"}}>Lanhnb.store</b>
                        </div>
                    </div>
                    <div className="col-sm-4 text-center mx-auto">
                        <div class="text-center mx-auto text-white" style={{marginTop:"20px"}}>

                            <p>Địa chỉ: Số 98 đường 477 phố Tiến Yết, thị trấn Me, huyện Gia Viễn, tỉnh Ninh Bình, Việt Nam</p>
                            <p>Điện thoại: +84 852286222    Email: lanhnb@gmail.com</p>
                            <p>Copyright © 2022 Lanhnb.store</p>


                        </div>
                    </div>
                    <div className="col-sm-4 text-center mx-auto">
                        <div className="mx-auto py-2 my-2">
                            <ol className="w3 d-inline-flex">
                                <li><Link href="tel:0996288999" title="Gọi: 0996288999" id="callComent_f"><img id="ca11"
                                    style={{height:"30px", width: "30px", marginLeft: "20px", marginRight:"20px"}} alt='' src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476621/logo/sm398ri30fvzlaymxgsu.png"/></Link>
                                </li>


                                <li ><Link to="https://zalo.me/0996288999" title="Liên hệ qua Zalo số: 0996288999"
                                    ><img id="ca11" style={{height:"30px", width: "30px", marginLeft: "20px", marginRight:"20px"}}
                                        src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476631/logo/vrkwatuwqwjd2ecuw6we.png" alt='' /></Link>
                                </li>
                                <li><Link to="https://vi-vn.facebook.com/lanhnb.store/" id="faceComent_f"
                                    title="Ghé trang facebook của Chúng tôi"><img id="ca11"
                                    style={{height:"30px", width: "30px", marginLeft: "20px", marginRight:"20px"}} alt='' src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476617/logo/quww4tqqdgojnsdlfid5.png" /></Link>
                                </li>

                            </ol>


                        </div>
                    </div>
                </div>

            </footer>







        </Wrapper >
        )
  


}
export default Foots2;
const Wrapper = styled.div`

  #container {
    min-height:10px;
   bottom:0;
    
    width:100%;
    z-index:10000;
  }
  #foots{
    
    display:flex;
    
}

@media only screen and (max-device-width: 480px) {
    #foots{
        display:block;
    }
}
    
   
`;

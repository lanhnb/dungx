import styled from "styled-components";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import MyImage2 from "./MyImage2";
import MyImage3 from "./MyImage3";

import Star from "./Star";


import { useState, useEffect } from "react";

import axios from "axios";
import { setHeaders, url } from "./api";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Foots2 from "./foot2";






const SingleXkld = () => {
    const params = useParams();
    const [xkld, setXkld] = useState({});
    const [isShown, setIsShown] = useState(false);
    const [isShowntb, setIsShowntb] = useState(false);
    const [isShownRM, setIsShownRM] = useState(false);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);


    const [hideF, sethideF] = useState(true)
    const [hideFt, sethideFt] = useState(true)
    const [hideFR, sethideFR] = useState(true)

    const { _id, namex, companyx, infox, descriptionx, timex, salaryx, starsx, image, video, categoryx, reviewsx } = xkld;

    useEffect(() => {
        setloading(true)
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/xklds/find/${params.id}`, setHeaders());

                setXkld(res.data);
            } catch (err) {

            }
            setloading(false)

        }
        fetchData()
    }, [params.id])

    // <!--End read more-->
    const Video1 = () => { setIsShown(current => !current); }
    const Thongbao = () => { setIsShowntb(current => !current); }
    const ReadMore = () => { setIsShownRM(current => !current); }


    return (
        <Wrapper>
            <Helmet><title>{_id}</title></Helmet>


            <div id="home11">

                <div className="w3 container" style={{ marginTop: "20px" }}>

                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-8 d-flex flex-column position-static">

                            <div className=" text-center row my-2 p-3 mb-8 border-bottom">
                                <h1 id="named"> {namex}</h1>
                            </div>
                            <div
                                className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                <div className="col-md-6 bg-light rounded">
                                    <h4 className="blog-post-title">Nước đến làm việc: {categoryx}</h4>

                                    <p className="mb-2">Đơn hàng: {companyx}</p>
                                    <h4>Công việc: {namex}</h4>
                                    <p className="mb-2">Nơi làm việc: {categoryx}</p>
                                    <h4>Mức lương:{salaryx}</h4>
                                    <p className="mb-2"> Số giờ làm việc: {timex}</p>
                                    <Button className="btnRe" onClick={() => navigate(`/orderx/${_id}`)} variant="primary">Registers</Button>
                                    <button style={{ float: "right" }} className="btnRe1" onClick={ReadMore} ><span onClick={() => sethideFR(!hideFR)}>{hideFR ? "Read more" : "Read more none"}</span></button>
                                </div>

                                <div className=" col-md-6 p-4 mb-3 d-lg-block">
                                    <MyImage3 imgs={image} />

                                </div>
                                <br></br>

                                <div className="fb-like" data-href={`http://192.168.1.9:3000/singlexkld/${_id}`} data-width=""
                                    data-layout="button" data-action="like" data-size="small" data-share="true"></div>

                                <div className="fb-comments" data-href={`http://192.168.1.9:3000/singlexkld/${_id}`} data-width=""
                                    data-numposts="5"></div>
                            </div>


                        </div>
                        <aside className="col-md-4 blog-sidebar">



                            <div className="p-4 mb-3 bg-light rounded">
                                <h4 className="font-italic">Với Cam kết</h4>
                                <p className="mb-0">Bằng kinh nghiệm 20 năm <em> Trong nghề tư vấn tuyển dụng xuất khẩu lao động</em>
                                    Lanhnb.store đã tìm kiếm các đơn hàng, trường đào tạo, đối tác tin cậy để chia sẻ, đồng hành cùng
                                    Quý khách..</p>
                            </div>

                            <div className=" p-4 mb-3 d-lg-block">
                                {
                                    isShown ? (
                                        < div id="more4" className=" col-md-12">
                                            <video width='350' controls>
                                                <source src={video[0]?.url} type='video/mp4'></source>
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>


                                    ) : (

                                        <MyImage2 imgs={image} />)}

                            </div>
                            <div className="w3 d-flex">
                                <div>
                                    <span>Xem thông báo </span>
                                    <button className="btnRe1" onClick={Thongbao}><span onClick={() => sethideFt(!hideFt)}>
                                        {hideFt ? "Thông báo" : "Tắt thông báo"}
                                    </span></button>

                                </div>
                                <div ssName="readmore4">
                                    <span >-Video đơn hàng </span>
                                    <button className="btnRe1" onClick={Video1} ><span onClick={() => sethideF(!hideF)}>
                                        {hideF ? "Video" : "Picture"}
                                    </span></button>
                                </div>
                            </div>
                            <div className="p-4 d-flex" >
                                <h4 className="font-italic">Liên hệ:</h4>
                                <ol className="list_foot">
                                    <li><Link to="tel:0996288999"><img id="ca11" src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476621/logo/sm398ri30fvzlaymxgsu.png"
                                        alt='' /></Link>
                                    </li>


                                    <li className="zalo_f"><Link to="https://zalo.me/0996288999" title="Liên hệ qua Zalo số: 0996288999"
                                        id="zalo_f"><img id="ca11"
                                            src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476631/logo/vrkwatuwqwjd2ecuw6we.png"
                                            alt='' /></Link>
                                    </li>
                                    <li><Link to="https://vi-vn.facebook.com/lanhnb.store/" id="faceComent_f"
                                        title="Ghé trang facebook của Chúng tôi"><img id="ca11" alt=''
                                            src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695476617/logo/quww4tqqdgojnsdlfid5.png" /></Link>
                                    </li>
                                </ol>

                            </div>
                            <p className="dc">Địa chỉ: Số 98 đường 477, thị trấn Me, huyện Gia Viễn, tỉnh Ninh Bình</p>
                        </aside>

                    </div>
                    <div className="khoant" style={{ height: "20px" }} ></div>
                </div >
                {
                    isShowntb && (
                        <div className="container">

                            <div id="more3" className="col-md-12">
                                <h2>Thong bao here</h2>
                                <MyImage3 imgs={image} />



                            </div>
                        </div>
                    )}
                {
                    isShownRM && (
                        <div className="w3 container">

                            <div id="more3" className="col-md-12">

                                <div dangerouslySetInnerHTML={{ __html: (infox) }} />

                            </div>
                        </div>
                    )}
            </div>
            <Foots2/>
        </Wrapper >

    )
}
export default SingleXkld;

const Wrapper = styled.header`
#named{
    text-transform: capitalize;
    font-variant-caps: all-petite-caps;
    color: #285ea6;
    font-size:30px;
  }
#hide {
    position: fixed;
    bottom:0;
    width:100%;
    
  }
  
  #height {
    position: fixed;
    top:5vh;
    
  }
  
  #container {
    min-height:50px;
  }

.btnRe{
    background-color:rgb(0 0 0 /0%);
    border: 0.1rem solid rgb(98 84 243); 
    color: gray;
    float:left;
}
.btnRe:hover{
    background-color: ${({ theme }) => theme.colors.btn};
    color:white;
  }

.btnRe1{
   background:none;
   border:none;
    color: gray;
   
}
.btnRe1:hover{
    color: ${({ theme }) => theme.colors.btn};
    font-style: italic;
  }




p.text-center.p_f {
    margin-top: -13px;
}
@media only screen and (max-device-width: 480px) {
    #logoft{
        display:none;
    }
    .l1{
        display:none;

    }
}
    
    .copyN{
        margin-top:30px;
    }
    .foots{
        display:flex;
        height: 50px;
        backround-color:#232f3e;
        
        left:0;
        bottom:0;
        right:0;
       

    }
    .container-fluid foots{
        backround-color:#232f3e;
    }
    .list_foot{
        display:flex;
    }
    #ca11{
        margin-top:15px;
        height:30px;
        margin-left:20px;
    }
    
    #more3{
        img{
            max-width: 100%;
             height: auto;
        }
        p{
            justify-content: space-between;
        }
    }
    justify-content: space-between;
   
    align-items: center;
    position: relative;

    #logoft{
        height: 40px;
        margin-top:5px;
    }
`;
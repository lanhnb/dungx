import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import Star from "./Star";
import { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';
import PageNavigation from "./PageNavigationNd"
import { Link } from "react-router-dom";
import { FaTeamspeak } from "react-icons/fa";
import Foots2 from "./foot2";






const SingleNhadat = ({ imgs = [{ url: "" }] }) => {
    const params = useParams();
    const [nhadat, setNhadat] = useState({});
    const [isShown, setIsShown] = useState(false);
    const [isShowntb, setIsShowntb] = useState(false);
    const [isShownRM, setIsShownRM] = useState(false);
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);


    const [hideF, sethideF] = useState(true)
    const [hideFt, sethideFt] = useState(true)
    const [hideFR, sethideFR] = useState(true)

    const { _id, named, area, info, address, createdAt, priced, priceOffd, huongd, starsd, image, video, categoryd, reviewsd } = nhadat;

    useEffect(() => {
        setloading(true)
        async function fetchData() {
            try {
                const res = await axios.get(`${url}/nhadats/find/${params.id}`, setHeaders());

                setNhadat(res.data);
            } catch (err) {

            }
            setloading(false)

        }
        fetchData()
    }, [params.id])

    // <!--End read more-->
    const Thongbao = () => { setIsShown(current => !current); }
  

    const [mainImage, setMainImage] = useState(imgs[0]);
    const [keysho, setKeysho] = useState();
   
    return (
        <Wrapper>
            <Helmet><title>{_id}</title></Helmet>


            <div id="home11">
                <div className="w3 container">
                    <div className="row">
                        <PageNavigation title={named} />
                        <div className="col-md-6 align-items-center">

                            {
                                isShown ? (
                                    < div id="more4" className=" col-md-12">
                                        <video width='350' controls>
                                            <source src={video[0]?.url} type='video/mp4'></source>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>


                                ) : (
                                    <>

                                        <div className="mySlides" style={{ width: "100%" }}>
                                            <div className="numbertext">{keysho + 1} / 6</div>
                                            <img src={mainImage.url} alt={mainImage.filename} style={{ width: "100%" }} />
                                        </div>



                                        <div className="imglist" style={{ display: "inline-flex" }}>

                                            {
                                                image?.map((curElem, index) => {
                                                    return (
                                                        <div className="w3-col s2 m2" style={{ margin: "10px" }}>
                                                            <img
                                                                src={curElem.url}
                                                                alt={curElem.filename}
                                                                className="box-image--style"
                                                                key={index}
                                                                onLoad={() => (setMainImage(curElem), setKeysho(index))}
                                                                onClick={() => (setMainImage(curElem), setKeysho(index))}
                                                                style={{ height: "auto", width: "100%" }}

                                                            />
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    </>
                                )}

                        </div>

                        <div className="col-md-6 shadow p-3 mb-5 bg-body rounded">
                            <div className="">
                                <div className="w3-col s12 m7">

                                    <h2 id="named"> {named}</h2>
                                    <div className="info">
                                        <p> &#10095;<b> Dien tich:</b> {area}</p>
                                        <p> &#10095;<b> Dia chi:</b>  {address}</p>
                                        <p> &#10095;<b> Price:</b>  {priced}</p>
                                        <p> &#10095;<b> Price Off:</b> {priceOffd}</p>
                                        <p >&#10095;<b> Huong:</b> {huongd}</p>
                                    </div>
                                    <div className="date1">
                                        <p style={{ marginTop: "5px" }}> &#10095; <b>Ma tin:</b>  {_id}</p>
                                        <p> &#10095; <b>Ngay dang:</b>  {moment(createdAt).fromNow()}</p>

                                    </div>


                                </div>
                                <div className="w3-col s12 m5" >
                                    <div className="amin" style={{ border: "1px solid #9e9e9e" }}>
                                        <div className="w3 d-flex">
                                            <div className="img" style={{ margin: "10px" }}>
                                                <img className="w3-circle" src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695458829/logo/tjxcmynwrh3tiwqmx9yg.jpg" alt='name' />
                                            </div>
                                            <div className="name" style={{ margin: "20px" }}>Lanhnb</div>

                                        </div>
                                        <div className="row">
                                            <li style={{ backgroundColor: "coral", margin: "5px", marginLeft: "auto", marginRight: "auto", width: "95%", textAlign: "center" }}><Link to="tel:0996288999"> <FaTeamspeak />  0996288999</Link></li>
                                            <li style={{ backgroundColor: "coral", margin: "5px", marginLeft: "auto", marginRight: "auto", width: "95%", textAlign: "center" }}><Link to="mailto: abc@example.com"> <FaTeamspeak /> lanhnb@gmail.com</Link></li>


                                        </div>
                                        <div className="w3 d-flex justify-content-center">
                                            <button id="btnLH" onClick={() => navigate(`/contact`)} style={{ border: "1px solid gray", background: "none", margin: "10px", padding: "5px" }}> <FaTeamspeak /> Lien he</button>

                                        </div>
                                        <div>
                                            <p>Hãy gửi yêu cầu tư vấn. Tôi sẽ liên hệ trả lời bạn trong vòng 60 phút.</p>
                                        </div>
                                        <div className="icon">
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

                                    </div>

                                </div>
                            </div>
                            <div><p style={{ color: "white" }}>sd</p></div>
                            <div>
                                
                                <button id="btnV" style={{background:"none", padding:"5px", border:"1px solid gray"}} onClick={Thongbao}><span onClick={() => sethideFt(!hideFt)}>
                                    {hideFt ? "View more Video" : "View more Picture"}
                                </span></button>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:"200px"}}>  </div>
<Foots2/>
        </Wrapper >

    )
}
export default SingleNhadat;
const Wrapper = styled.section`

#btnLH:hover, #btnV:hover{
    color:${({ theme }) => theme.colors.btn};
    font-style: italic;

}
#named{
    text-transform: capitalize;
    font-variant-caps: all-petite-caps;
    color: #285ea6;
    font-size:30px;
}
.info{
    margin-left:3px;
    border-top: 1px solid #9e9e9e;
    font-family: "Roboto", sans-serif;
    p{font-size:15px;}
}
.date1{
    border-bottom: 1px solid #9e9e9e;
    border-top: 1px solid #9e9e9e;
    margin-right:2px;
    p{font-size:15px;}
    
}
.icon{
   
    border-top: 1px solid #9e9e9e;
   
    
}
.list_foot{
    display:flex;
   
    align-items: stretch;
    justify-content: space-evenly;
}
}
#ca11{
    margin-top:15px;
    height:30px;
   
}
`;


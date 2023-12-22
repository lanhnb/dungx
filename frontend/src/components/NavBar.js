import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "./slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { FaCartPlus } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaHive } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegistered } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaTeamspeak } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';




const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [isShown1, setIsShown1] = useState(false);
  const [hideF, sethideF] = useState(true)
  const [mgr, setMgr] = useState("0px");

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown1(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
    navigate("/")
    
  };

  const click = mgr => {
    
    setMgr("200px")
  }
    useEffect(() => {
      document.getElementById('home11').style.marginLeft = mgr
      // document.body.style.marginLeft = mgr
    }, [mgr])
    const click1 = mgr => {
    
      setMgr("0px")
    }
      useEffect(() => {
        document.getElementById('home11').style.marginLeft = mgr
        // document.body.style.marginLeft = mgr
      }, [mgr])
  
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '98%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,

      px: 4,

      height: '100%',
      display: 'block',
      overflow: 'scroll',
    };

    return (
      <React.Fragment>
        <Button className="w3-bar-item w3-button w3-red" onClick={handleOpen}>Chính sách khách hàng</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style }}>
            <div className="w3 d-flex">
              <h3 id="child-modal-title">CHÍNH SÁCH KHÁCH HÀNG</h3>
              <p>
                <Link style={{ "margin": "10px" }} className="w3-red" id="btnR" to="/"><FaTimes /></Link>
              </p>
            </div>
            <p id="child-modal-description">

              <p>

                Cám ơn quý khách đã quan tâm và truy cập vào website. Chúng tôi tôn trọng và cam kết sẽ bảo mật
                những thông tin mang tính riêng tư của Quý khách.

                Bảo vệ dữ liệu cá nhân và gây dựng được niềm tin tới quý khách là vấn đề rất quan trọng của
                chúng tôi. Việc dùng tên và các thông tin khác liên quan đến quý khách tuân thủ theo quy định
                của pháp luật về bảo mật thông tin. Chúng tôi chỉ thu thập những thông tin cần thiết liên quan
                đến giao dịch mua bán.

                Quý khách có thể truy cập vào website mà không cần phải cung cấp thông tin chi tiết cá nhân. Quý
                khách truy cập ẩn danh và chúng tôi không thể biết bạn là ai nếu Quý khách không đăng nhập vào
                tài khoản của mình.</p>

              <b className="w3-text-red w3-wide w3-border-bottom">1. Thu thập thông tin cá nhân</b>
              <p>

                Chúng tôi thu thập, lưu trữ và xử lý thông tin của bạn cho quá trình mua hàng và cho những thông
                báo sau này liên quan đến đơn hàng, và để cung cấp dịch vụ, bao gồm một số thông tin cá nhân:
                Tên, email, địa chỉ, địa chỉ giao hàng, số điện thoại, chi tiết thanh toán.

                Chúng tôi sẽ dùng thông tin quý khách đã cung cấp để xử lý đơn đặt hàng, cung cấp các dịch vụ và
                thông tin yêu cầu thông qua website và theo yêu cầu của bạn.

                Hơn nữa, chúng tôi sẽ sử dụng các thông tin đó để quản lý tài khoản của bạn; xác minh và thực
                hiện giao dịch trực tuyến, nhận diện khách vào web, gửi thông tin bao gồm thông tin sản phẩm và
                dịch vụ. Nếu quý khách không muốn nhận bất cứ thông tin tiếp thị của chúng tôi thì có thể từ
                chối bất cứ lúc nào.

                Chúng tôi có thể chuyển tên và địa chỉ cho bên thứ ba để họ giao hàng cho bạn (ví dụ cho bên
                chuyển phát nhanh hoặc nhà cung cấp).

                Chi tiết đơn đặt hàng của bạn được chúng tôi lưu giữ nhưng vì lí do bảo mật nên chúng tôi không
                công khai trực tiếp va đã gửi chi tiết tới email.

                Quý khách cam kết bảo mật dữ liệu cá nhân và không tiết lộ cho bên thứ ba. Chúng tôi không chịu
                bất kỳ trách nhiệm nào cho việc dùng sai mật khẩu nếu đây không phải lỗi của chúng tôi.

                Chúng tôi có thể dùng thông tin cá nhân của bạn để nghiên cứu thị trường. mọi thông tin chi tiết
                sẽ được ẩn và chỉ được dùng để thống kê. Quý khách có thể từ chối không tham gia bất cứ lúc nào.
              </p>
              <b className="w3-text-red w3-wide w3-border-bottom">2. Bảo mật</b>
              <p>

                Chúng tôi có biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn truy cập trái phép hoặc
                trái pháp luật hoặc mất mát hoặc tiêu hủy hoặc thiệt hại cho thông tin của bạn.

                Chúng tôi khuyên quý khách không nên đưa thông tin chi tiết về việc thanh toán với bất kỳ ai
                bằng e-mail, chúng tôi không chịu trách nhiệm về những mất mát quý khách có thể gánh chịu trong
                việc trao đổi thông tin của quý khách qua internet hoặc email.

                Quý khách tuyệt đối không sử dụng bất kỳ chương trình, công cụ hay hình thức nào khác để can
                thiệp vào hệ thống hay làm thay đổi cấu trúc dữ liệu. Nghiêm cấm việc phát tán, truyền bá hay cổ
                vũ cho bất kỳ hoạt động nào nhằm can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống
                website. Mọi vi phạm sẽ bị tước bỏ mọi quyền lợi cũng như sẽ bị truy tố trước pháp luật nếu cần
                thiết.

                Mọi thông tin giao dịch sẽ được bảo mật nhưng trong trường hợp cơ quan pháp luật yêu cầu, chúng
                tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.

                Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi luật pháp Việt Nam
                và tòa án Việt Nam có thẩm quyền xem xét.
              </p>
              <b className="w3-text-red w3-wide w3-border-bottom">3. Quyền lợi khách hàng</b>
              <p>

                Quý khách có quyền yêu cầu truy cập vào dữ liệu cá nhân của mình, có quyền yêu cầu chúng tôi sửa
                lại những sai sót trong dữ liệu của bạn mà không mất phí. Bất cứ lúc nào bạn cũng có quyền yêu
                cầu chúng tôi ngưng sử dụng dữ liệu cá nhân của bạn cho mục đích tiếp thị.
              </p>
              <b className="w3-text-red w3-wide w3-border-bottom">4. Chính sách bảo hành sản phẩm</b>
              <p> Sản phẩm bán ra tại Website này được bảo hành, đổi trả theo chế độ bảo hành của nhà sản xuất,
                Nhà cung cấp nhập khẩu,... được gián them tem bảo hành của lanhnb và thực hiện theo cam kết khi
                quyết định mua bán.</p>
              <b className="w3-text-red w3-wide w3-border-bottom">5. Cung cấp thông tin khác</b>
              <p>
                Chúng tôi tiếp nhận, phân tích tạo nên nguồn thông tin tốt, tư vấn chiến lược cho nhà đầu tư,
                mua sắm, sử dụng dịch vụ. Các thông tin cung cấp hoàn toàn trung thực, có giá trị và được bảo
                mật tuyệt đối.
              </p>
              <b className="w3-text-red w3-wide w3-border-bottom">6. Hướng dẫn mua hàng qua Lanhnb.store:</b>
              <p>
                Quý khách lựa chọn việc đặt mua qua từng món hàng, tới nút Card Bạn chọn Kiểm tra và đi đến
                trang xác nhận, Bạn nhập thông tin và sẽ thông báo Id việc mua hàng của Bạn. Để xác nhận lại Bạn
                vào Tracker. Xong các bước trên Lanhnb.store sẽ liên hệ để hoàn tất việc mua bán.
              </p>
              <b className="w3-text-red w3-wide w3-border-bottom">7. Bình luận:</b>
              <p>
                Tại trang Bất động sản- Bạn đăng nhập để bình luận về sản phẩm của Lanhnb.store.
                Tại trang Shop, Tư vấn Xuất khẩu lao động. Bạn bình luận về sản phẩm của Lanhnb.store qua tài
                khoản Facebook của Bạn.
              </p>
            </p>
            <Button className="w3-red" onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
  }




  return (
    <>
      <nav className="nav-bar">
        <Link className="menu11">


          <Link id="openClose" onClick={handleClick}><span onClick={() => sethideF(!hideF)}>

            {hideF ? <FaList onClick={()=>{click("200px")}} /> : <FaList onClick={()=>{click1("0px")}}/>}
          </span>

           {/* <button onClick={()=>{click("200px")}}>change color</button>  */}
            
            </Link>
            <Link to="/">
              <img src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695431219/logo/epiu3addc0ing9mk4l2p.png" className="logo1" alt="logo1" />
            </Link>
          </Link>

          <Link to="/cart">
            <div className="nav-bag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-handbag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
              </svg>
              <span className="bag-quantity">
                <span>{cartTotalQuantity}</span>
              </span>
            </div>
          </Link>
          <Link to="/" className="lanb">Lanhnb.store</Link>
      </nav>

      {
        isShown1 && (
          <div id="mySidebar" className="w3-sidebar w3-bar-block w3-border-right w3-animate-left"
          >
            <Link to="/" className="w3-bar-item w3-button w3-border-bottom w3-large">
              <img className="w3-circle" src="https://res.cloudinary.com/dxnhv54sl/image/upload/v1695458829/logo/tjxcmynwrh3tiwqmx9yg.jpg" alt='name' /></Link>


            <Link to="/" className="w3-bar-item w3-button w3-red" onClick={handleClick}>Home</Link>
            <Link to="/nhadats" className="w3-bar-item w3-button" onClick={handleClick}> <FaHive />  Nhà đất</Link>
            <Link to="/xklds" className="w3-bar-item w3-button" onClick={handleClick}><FaPlaneDeparture />  Xuất khẩu lao động</Link>
            <Link to="/" className="w3-bar-item w3-button" onClick={handleClick}><FaCartPlus /> Shop</Link>
            <Link to="/contact" onClick={handleClick} className="w3-bar-item w3-button"><FaTeamspeak /> Contact</Link>


            {auth._id ? (
              <Links>
                <div className="amin">
                  {auth.isAdmin ? (

                    <div>
                      <Link to="/admin/summary" onClick={handleClick}>Admin</Link>
                    </div>
                  ) : null}
                  <div
                    onClick={() => {
                      dispatch(logoutUser(null));
                      toast.warning("Logged out!", { position: "bottom-left" });
                    }}
                  >
                    <FaSignOutAlt />Logout
                  </div>
                </div>
              </Links>
            ) : (
              <div className="amin">
                <AuthLinks>

                  <Link to="/login" className="login"><FaSignInAlt />  Login</Link>

                  <Link to="register"><FaRegistered />  Register</Link>

                </AuthLinks>
              </div>
            )}



            <div className="w3-bar-item w3-button w3-red" > <ChildModal /> </div>
           
          </div>




        )
      }


    </>
  )
}

export default NavBar;



const AuthLinks = styled.div`

.login{
  margin-left:15px;
  margin-right:5px;
}
h3#child-modal-title {
  color: red;
  font-weight: bold;
}
button#btnR {
  float: right;
  margin-left: 50px;
  margin-top: 3px;
}


b {
  font-size: 15px;
  color: #9d4040;
}
.lanb{
  font-size:17px;
}

  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;

const Links = styled.div`
  color: white;
  display: flex;

  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
    }
  }
  img.logo1 {
    height: 35px;
}
.amin{
  color:black;
  margin-left:20px;
  margin-bottom:10px;
  margin-top: 10px;
  font-size:15px;
  display:inline-flex;
}

`;

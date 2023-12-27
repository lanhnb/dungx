import styled from "styled-components";
import Map from "./map"
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { setHeaders, url } from './api';
import { getError } from '../components/payment/utils';

const Contact = () => {
  const key = 'yourKey'
  const [contact, setContact] = useState({
    namex: "",
    email: "",
    phone: "",
    desc: "",
  });
  

  const handInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {

      const { data } = await axios.post(`${url}/contact`,
        {
         namex:contact.namex,
         email:contact.email,
         phone:contact.phone,
         desc:contact.desc,

        }, setHeaders()
      );

      // navigate(`/xklds`);
      toast.info("Send success");
      console(data)

    } catch (err) {
     
      
    }

  }
  return (
    <Wrapper>
      <><div id="home11">
        <div className="w3 container contt">
          <div className="w3-col m4 s12 contact" style={{ maxWidth: "95%" }}>
            <h3>Liên hệ Lanhnb.store</h3>
            <form className="frmcontact" onSubmit={handleSubmit} action="" method="post">
              <div className="form-group">
                <label for="name">Tên</label>
                <input type="text"
                  className="form-control"
                  autoComplete="off"
                  id="namex"
                  name='namex'
                  value={contact.namex}
                  onChange={handInput}
                  placeholder="Nhập tên" />
              </div>
              <div className="form-group">
                <label for="name">Email</label>
                <input type="email"
                  className="form-control"
                  autoComplete="off"
                  id="email"
                  name='email'
                  value={contact.email}
                  placeholder="Nhập Email"
                  onChange={handInput}
                  required />
              </div>

              <div className="form-group">
                <label for="name">Điện thoại</label>
                <input type="tel"
                  className="form-control"
                  autoComplete="off"
                  value={contact.phone}
                  id="phone"
                  name='phone'
                  required
                  onChange={handInput}
                  placeholder="Nhập số điện thoại" />
              </div>
              <div className="form-group">
                <label for="desc">Nhập thông tin yêu cầu Lanhnb.store</label>
                <textarea className="form-control"
                  autoComplete="off"
                  value={contact.desc}
                  required
                  onChange={handInput}
                  id="desc" name='desc' rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-success" id="sb1" >Submit</button>
            </form>
          </div>
          <div className="w3-col m8 s12">
            <div w3-text-center>               {/* <Map
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                mapElement={<div style={{ height: `100%` }} />}
              /> */}
             
            </div>
          </div>
        </div>
        <div className="khoangtrong" style={{height:"920px"}}></div>
        </div>
      </>
    </Wrapper>
  )
}

export default Contact;





const Wrapper = styled.section`
.contt{
  margin:auto;
  max-width:90%;
  
}
#namex, #email, #phone, #desc{
  width:92%;
}
button#sb1 {
  padding: 5px 20px;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom:20px;
}
@media only screen and (max-device-width: 480px) {
  .contt{
      display:grid;
  }
  #namex, #email, #phone, #desc{
    width:68%;
  }
display:flex;
  button#sb1 {
    padding: 5px 20px;
    font-size: 18px;
    margin-top: 20px;
   
}
#map{max-width:98%;}
}  

#map{
  width:600px;
  height:450px;
  allowfullscreen:"";
  loading:lazy;
  referrerPolicy:no-referrer-when-downgrade;}
  `;





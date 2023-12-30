import { useEffect, useReducer, useState, useMemo } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import LoadingBox from "./payment/LoadingBox";
import MessageBox from "./payment/MessageBox";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { NavLink } from "react-router-dom";
import { FaTeamspeak } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { url } from "./api";

// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function XkldScreen() {

  const navigate = useNavigate();
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    xklds: [],
    loading: true,
    error: "",
  });
  const [data, getXklds] = useState([]);

  const [searchedVal, setSearchedVal] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${url}/xklds`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        getXklds(result.data);

      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }


    };
    fetchData();
  }, []);

  //filter

  let filterJapan = data.filter((item) => item.categoryx === "japan")
  let filterKorea = data.filter((item) => item.categoryx === "korea")
  let filterOther = data.filter((item) => item.categoryx === "other")



  return (
    <Wrapper>
      <div id="home11">
        <div style={{ marginTop: "15px" }} className="w3 container">

          <Helmet>
            <title>Labor Service</title>
          </Helmet>
          <h3> Labor service in lanhnb.store</h3>
          <div className="w3 d-sm-block d-md-flex">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (

              <div className="w3-col s12 m8" >
                <div>
                  <h4>Janpan</h4>
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}

                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                      430: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {
                      filterJapan.map((xkld) => (
                        <SwiperSlide>

                          <Card style={{ margin: "2px" }}>
                          <NavLink to={`/singlexkld/${xkld._id}`}>
                            <Card.Img variant="top" src={xkld.image[0]?.url} style={{ width: "100%" }} />
                            </NavLink>
                            <Card.Body>
                              <Card.Title>{xkld.namex}</Card.Title>
                              <Card.Text>
                                {xkld.descriptionx?.slice(1, 10)}
                                <p>  <b>Ngay dang:</b>  {moment(xkld.createdAt).fromNow()}</p>
                              </Card.Text>
                             
                            </Card.Body>
                          </Card>

                        </SwiperSlide>
                      ))

                    }
                  </Swiper>
                </div>
                <div>
                  <h4>Korea</h4>
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      430: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 3,
                      },
                    }}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {
                      filterKorea.map((xkld) => (
                        <SwiperSlide>

                          <Card style={{ margin: "2px" }}>
                          <NavLink to={`/singlexkld/${xkld._id}`}>
                            <Card.Img variant="top" src={xkld.image[0]?.url} style={{ width: "100%" }} />
                            </NavLink>
                            <Card.Body>
                              <Card.Title>{xkld.namex}</Card.Title>
                              <Card.Text>
                                {xkld.descriptionx?.slice(1, 10)}
                              </Card.Text>
                             
                            </Card.Body>
                          </Card>

                        </SwiperSlide>
                      ))

                    }
                  </Swiper>

                </div>
              </div>


            )}
            <div className="w3-col s12 m4" id="bang1">
              <div className="search" >
                             
                <input onChange={(e) => setSearchedVal(e.target.value)} style={{marginBottom:"2px"}} class="w3-input w3-border w3-padding" type="text" placeholder="Search by name" id="myInput" />
              </div>
              {/* simply set the query text here instead of triggering requestSearch */}
              
                <Table className="w3-table-all w3-margin-top">
                  <TableHead>
                    <TableRow style={{fontSize:"15px"}}>
                      <TableCell>Name</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Register</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {data
                      .filter((row) =>
                        // note that I've incorporated the searchedVal length check here
                        !searchedVal.length || row.namex?.toString()?.toLowerCase()?.includes(searchedVal?.toString()?.toLowerCase())
                      )
                      .map((item) => (
                        <TableRow key={item.db_id} >
                          <TableCell  onClick={() => navigate(`/singlexkld/${item._id}`)} style={{ cursor: "pointer", fontSize:"15px" }}>{item.namex}</TableCell>
                          <TableCell style={{fontSize:"15px"}}>{item.categoryx}</TableCell>
                          <TableCell style={{fontSize:"15px"}}>{item.companyx}</TableCell>
                          <TableCell onClick={() => navigate(`/orderx/${item._id}`)} style={{ cursor: "pointer", fontSize:"15px" }}><FaTeamspeak /></TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              
            </div>
          </div>
        </div>
      </div>

    </Wrapper>
  );

}



export default XkldScreen;
const Wrapper = styled.div`
tr.MuiTableRow-root.MuiTableRow-head.css-1q1u3t4-MuiTableRow-root {
  font-size: 15px;
}

th.MuiTableCell-root.MuiTableCell-head.MuiTableCell-sizeMedium.css-1ygcj2i-MuiTableCell-root {
  font-size: 15px;
}
.btnR, .bdRo{
  padding:5px;
  background-color:rgb(0 0 0 /0%);
  border: 0.1rem solid gray; 
  border-radius:5px;
  color: gray;
  margin-top:5px;
  font-size:15px;
}
.btnR:hover{
  background-color: ${({ theme }) => theme.colors.btn};
  color:white;
}  
@media only screen and (max-device-width: 480px) {
  
    
}
@media screen and (min-width: 769px) {
  #bang1{
    margin-left:10px;
  }
`;  

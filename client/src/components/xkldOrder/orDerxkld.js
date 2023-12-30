import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import React, { useContext, useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import { getError } from '../payment/utils';
import { styled } from "styled-components";
import { xkldsCreatex } from "../slices/xkldsSlice"

import { StyledFormR } from '../auth/StyledForm';
import { useState } from "react";
import Col from 'react-bootstrap/esm/Col';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../payment/Store';
import { setHeaders, url } from '../api';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import { Alert } from '@mui/material';



export default function OrderXkld() {

    const params = useParams();
    const [xkld, setXkld] = useState("");
    const [fullName, setfullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneN, setPhoneN] = useState("");
    const [mesX, setMesX] = useState("");
    const [checked, setCheck] = useState(false);

    const { createStatus } = useSelector((state) => state.xklds);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [loading, setloading] = useState(false);
    // const auth = useSelector((state) => state.auth);
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

    const handChange = () => {
        setCheck(!checked)
    }

    const placeOrderXHandler = async (e) => {
        e.preventDefault();
        if (checked === true) {


            try {

                const { data } = await axios.post(`${url}/ordersx`,
                    {
                        fullName,
                        address,
                        phoneN,
                        mesX,
                        namex: xkld.namex,
                        companyx: xkld.companyx,
                        categoryx: xkld.categoryx,

                    }, setHeaders()
                );

                navigate(`/xklds`);
                toast.info("Mess success");
                console.log(data)
            } catch (err) {
                toast.error(getError(err));
                console.log(getError(err))

            }
        }
        else {
            toast.info("Your must checker");

        }
    };


    return (
        <Wrapper>
            <div id='home11'  >
                <div className="w3 container hom22" style={{ marginLeft: "auto" }}>

                    <Helmet>
                        <title>Preview Order</title>
                    </Helmet>
                    <Row className='row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
                        <h1 className="my-3">Preview Order</h1>
                        <div className='w3 d-sm-block d-md-flex'>
                            <div className='w3-col m-md-6' id='mex'>

                                <div className='mex'>
                                    <h3>Details Job</h3>
                                    <p>Job: {xkld.namex}</p>
                                    <p>Country: {xkld.categoryx}</p>
                                    <p>Company: {xkld.companyx}</p>
                                </div>

                            </div>
                            <div className='w3-col m-md-6' id='cot1'>


                                <Form onSubmit={placeOrderXHandler}>

                                    <div className='w3 d-flex'>

                                        <div className='w3 col-6' style={{ maxWidth: "85%" }}>
                                            <Form.Label>Name:</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setfullName(e.target.value)} placeholder="Name" required />
                                        </div>
                                        <div className='w3 col-6' style={{ maxWidth: "43%", marginLeft: "10px" }}>
                                            <Form.Label>PhoneNumber:</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setPhoneN(e.target.value)} placeholder="PhoneNumber" required />
                                        </div>

                                    </div>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Address:</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} placeholder="Address" style={{ maxWidth: "95%", }} required />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Example textarea</Form.Label>
                                        <Form.Control as="textarea" onChange={(e) => setMesX(e.target.value)} placeholder="Mess" style={{ maxWidth: "95%", }} required rows={3} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" checked={checked} onChange={handChange} label="Check me out" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="btnRe">
                                        {createStatus === "pending" ? "Submitting" : "Submit"}
                                    </Button>
                                </Form>

                            </div>

                        </div>


                    </Row>
                </div>

            </div >
            <div className="khoang" style={{ "height": "450px" }}>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`
#mex{border-radius: 5px;
    border: 1px;
    background-color:#F5F5F5;
    margin:10px;
}
.mex{
    border-radius: 5px;
    border: 1px;
    
    margin-right:10px;
    margin-left:10px;
    margin-top:20px;
}
#cot1{
    margin-left:20px;
}

.btnRe{
    background-color:rgb(0 0 0 /0%);
    border: 0.1rem solid rgb(98 84 243); 
    color: gray;
    margin-bottom:20px;
}
.btnRe:hover{
    background-color: ${({ theme }) => theme.colors.btn};
    color:white;
  }

@media only screen and (max-device-width: 480px) {
    
    }
@media screen and (min-width: 769px) {
    
        .hom22{
            max-width:70%;
            margin-top:50px;
            margin-left: auto;
            margin-right: auto;
            background: light;
            background-color: rgb(246, 248, 250);
        }
    }

`
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { PrimaryButton } from "../CommonStyled";
import { xkldsCreate } from "../../slices/xkldsSlice";
import { SketchPicker } from 'react-color';
import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import LoadingBox from "./LoadingBox"
import MessageBox from './MessageBox';
import Button from 'react-bootstrap/Button';
import { Editor } from '@tinymce/tinymce-react';





const CreateXkld = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.xklds);

  const [video, setVideo] = useState([]);
  const [image, setImage] = useState([]);
  const [timex, setTimex] = useState([]);
  const [infox, setInfox] = useState("");
  const [namex, setNamex] = useState("");
  const [salaryx, setSalaryx] = useState("");
  const [categoryx, setCategoryx] = useState("");
  const [descriptionx, setDescriptionx] = useState("");
  const [companyx, setCompanyx] = useState("");
  const [starsx, setStarsx] = useState("");
  const [reviewsx, setReviewsx] = useState("");
  const [links, setLink] = useState([])




  const uploadCloudinaryV = async (video) => {
    const formData = new FormData()
    formData.append("file", video)
    formData.append("upload_preset", "lanhnbxkld")
    const api = ` https://api.cloudinary.com/v1_1/dxnhv54sl/video/upload`
    const { data } = await axios.post(api, formData, { method: "post" },
    )
    console.log("data", data)
    return { public_id: data.public_id, url: data.url }
  }


  const uploadCloudinary = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "lanhnbxkld")
    const api = ` https://api.cloudinary.com/v1_1/dxnhv54sl/image/upload`
    const { data } = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log("data", data)
    return { public_id: data?.public_id, url: data?.secure_url }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    let arr = []
    let arr1 = []
    try {

      for (let i = 0; i < image.length; i++) {
        const data = await uploadCloudinary(image[i])
        arr.push(data)
        setLink(arr)
      }
      const dataV = await uploadCloudinaryV(video[0])
      arr1.push(dataV)


      console.log("arr1", arr1)

    } catch (error) {
      console.log(error)

    }

    dispatch(
      xkldsCreate({
        namex,
        categoryx,
        companyx,
        salaryx,
        descriptionx,
        image: arr,
        video: arr1,
        timex,
        starsx,
        infox,
        reviewsx,

      })
    );
  };


  return (
    <StyledCreateProduct>

      <StyledForm onSubmit={handleSubmit}>
        
        <input
          type='file'
          multiple={true}
          onChange={(e) => setImage(e.target.files)}

        />

        <input type="file"
          id="input" name="input_video"
          onChange={(e) => setVideo(e.target.files)}
          accept="video/mp4, video/mov"
           />

        <div className="w3 d-flex">
          <select onChange={(e) => setCategoryx(e.target.value)} required>
            <option value="">Select Country</option>
            <option value="japan">Japan</option>
            <option value="korea">Korea</option>
            <option value="eu">EU</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Company"
            onChange={(e) => setCompanyx(e.target.value)}
            required
            style={{width:"50%"}}
          />

          <input
            type="text"
            placeholder="Job"
            onChange={(e) => setNamex(e.target.value)}
            required
            style={{width:"50%"}}
          />
          <input
            type="number"
            placeholder="Salary"
            onChange={(e) => setSalaryx(e.target.value)}
            required
            style={{width:"50%"}}
          />
         
        </div>
        <div className="w3 d-flex">
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDescriptionx(e.target.value)}
          required
        />
         <input
            type="date"
            placeholder="Time"
            onChange={(e) => setTimex(e.target.value)}
            required
          />
        </div>
        <Editor

          textareaName="content"
          initialValue="Infor"
          onEditorChange={(newText) => { setInfox(newText) }}
          apiKey='hti6y0ibvyw520x5nrvffuhqg0nfvahvnqq5snn6pz8dna1z'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'infox',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
          }}

        />
        <div className="w3 d-flex">


          <input
            type="number"
            placeholder="reviews"
            onChange={(e) => setReviewsx(e.target.value)}
            required
            style={{ width: "80%" }}
          />
          <input
            type="number"
            placeholder="Stars"
            onChange={(e) => setStarsx(e.target.value)}
            required
            style={{ width: "80%" }}
          />
        </div>

        <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton>
      </StyledForm>


      <ImagePreview>
        {links ? (
          links && links.length > 0 && links.map(link => {
            return (
              <div key={link?.public_id}>
                <img width={300} alt='' src={link?.url} />
              </div>
            )
          })
        ) : (
          <p>Product image upload preview will appear here!</p>)
        }
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateXkld;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-top: 5px;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
    padding-top:10px;
  }
  `;


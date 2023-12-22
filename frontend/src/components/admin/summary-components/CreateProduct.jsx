import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { PrimaryButton } from "../CommonStyled";
import { productsCreate } from "../../slices/productsSlice";
import { SketchPicker } from 'react-color';
import React from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';


const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createStatus } = useSelector((state) => state.products);

  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [colors, setColors] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [priceOff, setPriceOff] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [stock, setStock] = useState("");
  const [stars, setStars] = useState("");
  const [reviews, setReviews] = useState("");
  const [links, setLink] = useState([])

  const [checked, setChecked] = React.useState(false);
  function handleChangeColor(e) {
    setChecked(e.target.checked);
  }

  const uploadCloudinary = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "lanhnb2")
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
    try {

      for (let i = 0; i < image.length; i++) {
        const data = await uploadCloudinary(image[i])
        arr.push(data)
      }
      setLink(arr)

    } catch (error) {
      console.log(error)

    }

    dispatch(
      productsCreate({
        name,
        category,
        company,
        price,
        priceOff,
        description,
        info,
        colors,
        image: arr,
        stock,
        stars,
        reviews,

      })
    );
  };

  const handleChangeComplete = (color) => {
    // state = {
    //   background: '#fff',
    // };
    setColors(color.hex);

  };
  return (
    <StyledCreateProduct>

      <StyledForm onSubmit={handleSubmit}>

        <input
          type='file'
          multiple={true}
          onChange={(e) => setImage(e.target.files)}

        />

        <div>
          <h6>
            {" "}
            Creating the <i> Custom controlled checkbox </i> for color Products {" "}
          </h6>
          <input value="test" type="checkbox" onChange={handleChangeColor} />
          <br></br>


        </div>
        <div className="w3 d-flex">
          <select onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="iphone">iPhone</option>
            <option value="samsung">Samsung</option>
            <option value="xiomi">Xiomi</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
            required
            style={{ width: "80%" }}
          />

          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="w3 d-flex">
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price Off"
            onChange={(e) => setPriceOff(e.target.value)}
            required
          />
        </div>
        <input
          type="text"
          placeholder="Short Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Editor

          textareaName="content"
          initialValue="Info"
          onEditorChange={(newText) => { setInfo(newText) }}
          apiKey='hti6y0ibvyw520x5nrvffuhqg0nfvahvnqq5snn6pz8dna1z'
          init={{
            plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'info',
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
            placeholder="Stock"
            onChange={(e) => setStock(e.target.value)}
            required
            style={{ width: "80%" }}
          />
          <input
            type="number"
            placeholder="reviews"
            onChange={(e) => setReviews(e.target.value)}
            required
            style={{ width: "80%" }}
          />
          <input
            type="number"
            placeholder="Stars"
            onChange={(e) => setStars(e.target.value)}
            required
            style={{ width: "80%" }}
          />
        </div>

        <PrimaryButton type="submit">
          {createStatus === "pending" ? "Submitting" : "Submit"}
        </PrimaryButton>
      </StyledForm>
      <PickColor>
        {checked ? (
          <div> <SketchPicker
            color={colors.background}
            onChangeComplete={handleChangeComplete}
          /> </div>
        ) : (
          <div> Set Product color is not checked. </div>
        )}

      </PickColor>
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
      <div style={{ height: "20px" }}></div>
    </StyledCreateProduct>


  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
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
const PickColor = styled.div`
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
`;

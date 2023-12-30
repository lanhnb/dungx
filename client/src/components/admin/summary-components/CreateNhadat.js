import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PrimaryButton } from "../CommonStyled";
import { nhadatsCreated } from "../../slices/nhadatsSlice";
import React from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';





const CreateNhadat = () => {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.nhadats);

    const [video, setVideo] = useState([]);
    const [image, setImage] = useState([]);
    const [huongd, setHuongd] = useState("");
    const [info, setInfo] = useState("");
    const [named, setNamed] = useState("");
    const [priced, setPriced] = useState("");
    const [priceOffd, setPriceOffd] = useState("");
    const [categoryd, setCategoryd] = useState("");
    const [address, setAdress] = useState("");
    const [area, setArea] = useState("");
    const [starsd, setStarsd] = useState("");
    const [reviewsd, setReviewsd] = useState("");

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
               
            }
            const dataV = await uploadCloudinaryV(video[0])
            arr1.push(dataV)


            console.log("arr1", arr1)

        } catch (error) {
            console.log(error)

        }

        dispatch(
            nhadatsCreated({
                named,
                categoryd,
                area,
                huongd,
                address,
                image: arr,
                video: arr1,
                priced,
                priceOffd,
                starsd,
                info,
                reviewsd,

            })
        );
    };


    return (
        <StyledCreateProduct>

            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <input
                        type='file'
                        multiple={true}
                        onChange={(e) => setImage(e.target.files)}

                    />

                    <input type="file"
                        id="input" name="input_video"
                        onChange={(e) => setVideo(e.target.files)}
                        accept="video/mp4, video/mov" />
                    <select onChange={(e) => setCategoryd(e.target.value)} required>
                    <option value="">Select Category</option>
                        <option value="Mua">Mua</option>
                        <option value="Ban">Ban</option>
                        <option value="other">Other</option>
                    </select>
                </div>


                <input
                    type="text"
                    placeholder="Area"
                    onChange={(e) => setArea(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="P post"
                    onChange={(e) => setNamed(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Huong"
                    onChange={(e) => setHuongd(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setPriced(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price Off"
                    onChange={(e) => setPriceOffd(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Short Description"
                    onChange={(e) => setAdress(e.target.value)}
                    required
                />
                 <input
                    type="number"
                    placeholder="reviews"
                    onChange={(e) => setReviewsd(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Stars"
                    onChange={(e) => setStarsd(e.target.value)}
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
                        tinycomments_mode: 'infox',
                        tinycomments_author: 'Author name',
                        mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                        ],
                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    }}

                />
               


                <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                </PrimaryButton>
            </StyledForm>



        </StyledCreateProduct>
    );
};

export default CreateNhadat;

const StyledForm = styled.form`
  

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
 
`;



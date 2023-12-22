import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PrimaryButton } from "./CommonStyled";
import { useSelector } from "react-redux";
import { productsEdit } from '../slices/productsSlice';



export default function EditProduct({ prodId }) {
    const [open, setOpen] = React.useState(false);

    const { items, editStatus } = useSelector(state => state.products);
    const [currentProd, setCurrentProd] = useState({});
    const [previewImg, setPreviewImg] = useState("");

    const dispatch = useDispatch();

    const [productImg, setProductImg] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFile(file);
    };

    const TransformFile = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImg(reader.result);
                setPreviewImg(reader.result);
            };
        } else {
            setProductImg("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            productsEdit({
                productImg,
                product: {
                    ...currentProd,
                    name: name,
                    category: category,
                    price: price,
                    description: description,
                }

            })
        );
    }

        const handleClickOpen = () => {

            setOpen(true);
            let selectedProd = items.filter((item) => item.id === prodId)
            selectedProd = selectedProd[0];

            setCurrentProd(selectedProd);
            setPreviewImg(selectedProd.imge);
            setProductImg("");
            setCategory(selectedProd.category);
            setName(selectedProd.name);
            setPrice(selectedProd.price);
            setDescription(selectedProd.description);


        };

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <div>
                <Edit onClick={handleClickOpen}>Edit</Edit>
                <Dialog  open={open} onClose={handleClose}
                    fullWidth={true}
                    maxWidth={"md"}
                >
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogContent>
                        <StyledEditProduct>
                            <StyledForm onSubmit={handleSubmit}>
                                <h3>Create a Product</h3>
                                <input
                                    accept="image/*"
                                    type="file"
                                    onChange={handleProductImageUpload}
                                    
                                />
                                <select onChange={(e) => setCategory(e.target.value)} >
                                    <option value="">Select Category</option>
                                    <option value="iphone">iPhone</option>
                                    <option value="samsung">Samsung</option>
                                    <option value="xiomi">Xiomi</option>
                                    <option value="other">Other</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Short Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    required
                                />

                                <PrimaryButton type="submit">
                                    {editStatus === "pending" ? "Submitting" : "Submit"}
                                </PrimaryButton>
                            </StyledForm>
                            <ImagePreview>
                                {previewImg ? (
                                    <>
                                        <img src={previewImg} alt="product images!" />
                                    </>
                                ) : (
                                    <p>Product image upload preview will appear here!</p>
                                )}
                            </ImagePreview>
                        </StyledEditProduct>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

const Edit = styled.div`
    border:none;
    outline: none;
    padding: 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    background-color: #4b70e2;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

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

const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;

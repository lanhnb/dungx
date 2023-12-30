import { useEffect } from "react"
import router from "../../../../backend/routes/products";
import axios from "axios";
import { productsCreate } from "../slices/productsSlice";
import { url } from "../slices/api";

const AdminProductAddPage = ()=>{
    useEffect(()=>{
        const form = document.getElementById("form-add");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productImage = document.getElementById("product-images");
        form.addEventListener("submit", async function(e){
            e.preventDefault();
            const urls = await uploadFile(productImage.files);
            const newProduct = {
                name: productName.value,
                price: productPrice.value,
                galary: urls,
            };
            productsCreate(newProduct)
            .then(()=> router.navigate("/admin/products"))
            axios.post(`${url}/products`, newProduct).then()=>{
                "pass"
            }
            
        };)
    })
    const uploadFile = async(files)=>{
        if(files){
            const CLOUD_NAME="";
            const PRESET_NAME="";
            const FOLDER_NAME="";
            const urls =[];
            const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

            const formData = new FormData();
            formData.append("upload_preset", PRESET_NAME);
            formData.append("folder", FOLDER_NAME);

            for (const file of files){
                formData.append("file", file);
                const response = await axios.post(api, formData,{
                    headers:{
                    "Content-Type": "multipart/form-data",
                },
            });
            urls.push(response.data.secure_url);
            
            }
            return urls;
            
        }
    }
    return `<div class="container"
    <h1>Them san pham </h1>
    <form action="" id="form-add"
    <div class="form-group mb-3">
    <label for=""> Ten san pham</label>
    <input type="text" id="product-name" value="${product.name ?? ""}">
    </div>
    <div class="form-group mb-3">
    <label for=""> Ten san pham</label>
    <input type="text" id="product-price" value="${product.price ?? ""}">
    </div>
    
    <input type="file" multiple id="product-images">
    </form>

    <div/>
    `
}
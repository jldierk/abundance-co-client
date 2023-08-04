import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductForm = () => {
    const [loading, setLoading] = useState(true);
    const [productArr, setProductArr] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    console.log("url: " + import.meta.env.VITE_REACT_APP_API_URL);

    useEffect(() => {
        setLoading(true);

        let uri = BACKEND_BASE_URL + "/api/v1/products"
        fetch(uri)
          .then(response => response.json())
          .then(json => setProductArr(json))
          .then(setLoading(false))
          .catch(error => console.error(error));
    }, [selectedProduct]);

    function selectProduct(selected) {
        setSelectedProduct(selected);
    }

    return (
        <div>
            <div>
                {selectedProduct && <ProductCard product={selectedProduct}/>}
                {selectedProduct && <SelectedProduct product={selectedProduct} updateSelected={selectProduct}/>}
            </div>
            <h3>Product Table</h3>
            <table>
                <tr style={{textAlign: "left"}}>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Image Url</th>
                </tr>
            {productArr.map(product =>
            <tr className="table-row" onClick={selectProduct.bind(this, product)}>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td><a>{product.imageUrl}</a></td>
            </tr>
            )}
            </table>
        </div>
    )
}

function SelectedProduct(props) {
    var product = props.product;
    const [inputName, setInputName] = useState(product.productName || "");
    const [inputDescription, setInputDescription] = useState(product.description || "");
    const [inputImageUrl, setInputImageUrl] = useState(product.inputImageUrl || "");
    const [inputScents, setInputScents] = useState(product.scents || "");
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => { 
        setInputName(product.productName || "");
        setInputDescription(product.description || "");
        setInputImageUrl(product.imageUrl || "");
    }, [product.productName, product.description, product.imageUrl] )
    
    function saveProduct() {
        product.productName = inputName;
        product.description = inputDescription;
        product.imageUrl = inputImageUrl;

        var scentArr = inputScents.split(",");
        var scents = JSON.parse("[" + scentArr.map(scent=>"{\"scentName\": \"" + scent + "\"}").join(",") + "]")
        product.scents = scents;

        const requestOptions = {    
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          };
          let url = BACKEND_BASE_URL + '/api/v1/products';
          fetch(url, requestOptions)
            .then(response=>response.json())
            .then(data=> {
              console.log("Saved data for product: " + data);
              props.updateSelected(data);
            })
            .catch(err => {console.log("Error " + err.json)});
    }

    return (
        <div style={{margin: "20px"}}>
            <h3>Update Product Details</h3>
            <div>
                <span>Name : </span>
                <span><input className="admin-input" type="text" id="productName" name="productName" value={inputName} onChange={(e) => {setInputName(e.target.value)}}/></span>
            </div>
            <div>
                <span>Description : </span>
                <span><input className="admin-input" type="text" id="description" name="description" value={inputDescription} onChange={(e) => {setInputDescription(e.target.value)}}/></span>
            </div>
            <div>
                <span>Image URL: </span>
                <span><input className="admin-input" type="text" id="imageUrl" name="imageUrl" value={inputImageUrl} onChange={(e) => {setInputImageUrl(e.target.value)}}/></span>
            </div>
            <div>
                <span>Scents: </span>
                <span><input className="admin-input" type="text" id="scents" name="scents" value={inputScents} onChange={(e) => {setInputScents(e.target.value)}}/></span>
            </div>

            <button className="button" onClick={saveProduct.bind(this)}>Save</button>
        </div>
    )
    
}

export default ProductForm;
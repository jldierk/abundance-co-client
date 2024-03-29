import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductItemSet from "./ProductItemSet";
import DraggableTable from "./DraggableTable";

const ProductForm = () => {
    const [loading, setLoading] = useState(true);
    const [productArr, setProductArr] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        setLoading(true);

        let uri = BACKEND_BASE_URL + "/api/v1/products"
        fetch(uri)
          .then(response => response.json())
          .then(json => setProductArr(json))
          .then(setLoading(false))
          .catch(error => console.error(error));
    }, [selectedProduct]);

    function addNewProduct() {
        var newProduct = {};
        setProductArr(productArr => [...productArr, newProduct]);
        setSelectedProduct(newProduct);
    }

    function updateElementOrder(products) {
        for (let i = 0; i < products.length; i++) {
            products[i].sortOrder = i;
        }

        const requestOptions = {    
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },            
            body: JSON.stringify(products)
          };
          let url = BACKEND_BASE_URL + '/api/v1/products/multi';
          fetch(url, requestOptions)
            .then(response=>response.json())
            .then(data=> {
                setProductArr(data);
            })
            .catch(err => {
                console.log("Error " + err)
            });
    }

    return (
        <div style={{display: "flex", width:"100%", justifyContent: "space-evenly"}}>
            <div>
                <h3>Products</h3>
                <DraggableTable elements={productArr} updateElementsCallback={updateElementOrder} updateSelectedCallback={setSelectedProduct}/>
                <button className="button btn-black-white" style={{marginTop: "15px", marginBottom: "15px"}} onClick={addNewProduct.bind(this)}>New Product</button>
            </div>
            <div>
                {selectedProduct && <SelectedProduct product={selectedProduct} updateSelected={setSelectedProduct}/>}                
            </div>
            <div>
                {selectedProduct && <h3>Sample View</h3>}
                {selectedProduct && <ProductCard product={selectedProduct}/>}
            </div>
        </div>
    )
}

function SelectedProduct(props) {
    var product = props.product;
    const [inputName, setInputName] = useState(product.productName || "");
    const [inputDescription, setInputDescription] = useState(product.description || "");
    const [inputImageUrl, setInputImageUrl] = useState(product.imageUrl || "");
    var scents = convertScentsToString(product.scents);
    const [inputScents, setInputScents] = useState(scents || "");
    const [inputActive, setInputActive] = useState(product.activeInd);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => { 
        setInputName(product.productName || "");
        setInputDescription(product.description || "");
        setInputImageUrl(product.imageUrl || "");
        setInputScents(convertScentsToString(product.scents));
        setInputActive(product.activeInd);
    }, [product.productName, product.description, product.imageUrl, product.activeInd] )

    function convertScentsToString(scentArr) {
        if (scentArr) {
            return scentArr.map(scent=>scent.scentName).join(",");
        }
        return "";
    }
    
    function saveProduct() {
        product.productName = inputName;
        product.description = inputDescription;
        product.imageUrl = inputImageUrl;

        var scentArr = inputScents.split(",");
        var scents = JSON.parse("[" + scentArr.map(scent=>"{\"scentName\": \"" + scent + "\"}").join(",") + "]")
        product.scents = scents;
        product.activeInd = inputActive;

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
        <div>        
            <div>
                <h3>Update Product Details</h3>
                <div className="input-wrapper">
                    <span className="label">Product ID : </span>
                    <span>{product.id}</span>
                </div>
                <div className="input-wrapper">
                    <span className="label">Name : </span>
                    <span><input className="admin-input" type="text" id="productName" name="productName" value={inputName} onChange={(e) => {setInputName(e.target.value)}}/></span>
                </div>
                <div className="input-wrapper">
                    <span className="label">Description : </span>
                    <span><input className="admin-input" type="text" id="description" name="description" value={inputDescription} onChange={(e) => {setInputDescription(e.target.value)}}/></span>
                </div>
                <div className="input-wrapper">
                    <span className="label">Image URL: </span>
                    <span><input className="admin-input" type="text" id="imageUrl" name="imageUrl" value={inputImageUrl} onChange={(e) => {setInputImageUrl(e.target.value)}}/></span>
                </div>
                <div className="input-wrapper">
                    <span className="label">Scents: </span>
                    <span><input className="admin-input" type="text" id="scents" name="scents" value={inputScents} onChange={(e) => {setInputScents(e.target.value)}}/></span>
                </div>
                <div className="input-wrapper">
                    <span className="label">Active: </span>
                    <span><select style={{marginRight:"15px", width:"100px"}} value={inputActive} onChange={(e) => {setInputActive(e.target.value)}}>
                            <option key="active" value={true}>Active</option>
                            <option key="inactive" value={false}>Inactive</option>
                        </select>
                    </span>
                </div>

                <button className="button btn-black-white" style={{marginTop: "15px", marginBottom: "15px"}} onClick={saveProduct.bind(this)}>Save</button>
            </div>
            <div>
                <ProductItemSet product={product}/>
            </div>
        </div>
    )   
}

export default ProductForm;
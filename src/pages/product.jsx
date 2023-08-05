import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ProductView(props) {
    const location = useLocation();
    var product = location.state.product;
    if (!product) {return (<div>Product Not Found</div>)}
    
    const [itemArr, setItemArr] = useState([]);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    
    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products/" + product.id + "/items"
        fetch(uri)
        .then(response => response.json())
        .then(json => setItemArr(json))
        .catch(error => console.error(error));
    }, []);
    
    function addToCart(item) {
        var postBody = {itemId:item.id, quantity: 1};
        
        const requestOptions = {    
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        };
        let url = BACKEND_BASE_URL + '/api/v1/orders/cart';
        fetch(url, requestOptions)
        .then(response=>response.json())
        .then(json=>props.updateCart(json))
        .then(console.log("Added item to cart"))
        .catch(err => {console.log("Error " + err.json)});
    }
    
    let cart = props.cart;
    let item = itemArr[0];
    return (
        <div className="main-content" style={{display:"flex"}}>        
            <div style={{flex: 1, display: "flex", alignItems:"center", justifyContent: "space-evenly"}}>
                <div style={{flex: 1}}>
                    <img style={{height: "400px", width:"400px"}} src={product.imageUrl}></img>
                </div>
                <div style={{flex: 1}}>
                    <h2>{product.productName}</h2>
                    <div>{product.description}</div>
                    
                    {item && <div>{item.size}</div>}
                    {item && <div>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item.price)}</div>}
                    {item && <AddToCartButton cart={cart} item={item} addToCartAction={addToCart}/>}
                </div>
            </div>
        </div>
    )
}

function AddToCartButton(props) {
    var cart = props.cart;
    var item = props.item;

    if (cart && cart.orderItems && cart.orderItems.some(oi=>oi.itemId == item.id)) {
        return (<div>This is already in your cart</div>)
    } else {
        return (<button className="button" onClick={() => {props.addToCartAction(item)}}>Add To Cart</button>)
    }
}
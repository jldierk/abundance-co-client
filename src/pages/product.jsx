import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProductView(props) {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [itemArr, setItemArr] = useState([]);
    const [itemQuant, setQuantity] = useState(1);
    const location = useLocation();
    var product = location.state.product;
    if (!product) {return (<div>Product Not Found</div>)}
    
    let cart = props.cart;
    let item = itemArr[0];

    function handleQuantityChange(event) {
        var quantity = event.target.value;
        setQuantity(quantity);
    }
    
    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products/" + product.id + "/items"
        fetch(uri)
        .then(response => response.json())
        .then(json => {
            setItemArr(json);
            if (cart && cart.orderItems && json && json.length > 0) {
                setQuantity(cart.orderItems.filter(oi=>oi.itemId == json[0].id)[0].quantity);
            }
        })
        .catch(error => console.error(error));
    }, [cart]);
    
    function addToCart(item) {
        var quantInt = parseInt(itemQuant);
        var postBody = {itemId:item.id, quantity: quantInt};
        
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
    
    return (
        <div className="main-content" style={{display:"flex"}}>        
            <div style={{flex: 1, display: "flex", alignItems:"center", justifyContent: "space-evenly"}}>
                <div style={{flex: 3, textAlign:"center"}}>
                    <img style={{height: "400px", width:"400px", borderRadius:"15px", border: "1px solid var(--smoke)"}} src={product.imageUrl}></img>
                </div>
                <div style={{flex: 2}}>
                    <h2>{product.productName}</h2>
                    {product.scents && <div>{product.scents.map(scent=>scent.scentName).join(", ")}</div>}
                    <div>{product.description}</div>
                    
                    {item && <div>{item.size}</div>}
                    {item && <div>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item.price)}</div>}
                    <AddToCartButton onChangeQuantity={handleQuantityChange} cart={cart} item={item} addToCartAction={addToCart} quantity={itemQuant}/>
                </div>
            </div>
        </div>
    )
}

function AddToCartButton(props) {
    var cart = props.cart;
    var item = props.item;
    var quantity = props.quantity;

    if (!item) {
        return (<div><i>This product cannot be added to you cart because it does not have items associated with it.</i></div>)
    }

    if (cart && cart.orderItems && cart.orderItems.some(oi=>oi.itemId == item.id)) {
        return (
            <div>
                <span>
                    <select style={{marginRight:"15px", width:"40px"}} onChange={props.onChangeQuantity.bind(this)} value={quantity}>
                        {[1,2,3,4,5,6,7,8,9].map(value => <option key={"quant_" + value}value={value}>{value}</option>)}
                    </select>
                </span>   
                <span>
                    <button className="button btn-black-white" onClick={() => {props.addToCartAction(item)}}>Update Cart</button>
                </span>
            </div>
        )
    } else {
        return (<button className="button btn-black-white" onClick={() => {props.addToCartAction(item)}}>Add To Cart</button>)
    }
}
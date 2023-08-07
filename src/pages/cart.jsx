import React, { useEffect, useState } from "react";

export default function CartPage(props) {
    var cart = props.cart;
    if (!cart || !cart.orderItems) return (<div>No cart information found</div>);

    function submitOrder() {

    }

    return (
        <div className="main-content">
            <div style={{display:"flex", alignItems: "center", justifyContent: "space-evenly"}}>                
                <div style={{display:"flex", flexDirection: "column"}}>
                    <div><h2>Your Cart</h2></div>
                    {cart.orderItems.map(oi=>{
                        return (<OrderItemCard itemId={oi.itemId} quantity={oi.quantity} setCartCallback={props.setCartCallback}/>)
                    })}
                </div>
                <div style={{border:"1px solid var(--smoke)", padding: "20px", borderRadius: "10px"}}>
                    <h3 style={{margin:"0px"}}>Cart Summary</h3>
                    <div>
                        <div>Total Cost: {new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(cart.orderTotal)}</div>
                    </div>
                    <a href="/checkOut"><button style={{margin: "10px 0px px 0px"}} className="button btn-black-white">Check Out</button></a>
                </div>
            </div>
        </div>
    )
}

function OrderItemCard(props) {
    var itemId = props.itemId;
    var quantity = props.quantity;
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    const [itemDetail, setItemDetail] = useState({});
    const [itemTotal, setItemTotal] = useState(0);

    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/items/" + itemId + "/details";
        fetch(uri)
          .then(response => response.json())
          .then(itemDetail => {
            setItemDetail(itemDetail);
            var total = parseFloat(itemDetail.price).toPrecision(4) * parseInt(quantity);
            setItemTotal(total);
            props.totalCallback({itemId: itemId, total: total});
        })        
          .catch(error => console.error(error));
    }, []);

    function removeFromCart(itemDetails) {        
        const requestOptions = {    
            method: 'DELETE',
            credentials: 'include'
        };
        let url = BACKEND_BASE_URL + '/api/v1/orders/cart/' + itemDetails.itemId;
        fetch(url, requestOptions)
        .then(response=>response.json())
        .then(json=> {
            props.setCartCallback(json);
        })
        .then(console.log("Removed item to cart"))
        .catch(err => {console.log("Error " + err.json)});
    }

    return (
        <div key={itemDetail.itemId} className="order-item-card">
            <div>
                <img style={{margin: "15px", width: "175px", height: "175px"}} src={itemDetail.imageUrl}/>
            </div>
            <div>
                <div style={{fontSize: "20px"}}>{itemDetail.productName}</div>
                <div>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(itemDetail.price)}</div>
                <div>Quantity: {quantity}</div>
                <br/>
                <div>Item Total: {new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(itemTotal)}</div>
                <button style={{margin: "10px 0px 10px 0px"}} className="button btn-black-white" onClick={() => {removeFromCart(itemDetail)}}>Remove From Cart</button>
            </div>
        </div>
    )
} 
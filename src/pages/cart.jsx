import React, { useEffect, useState } from "react";

export default function CartPage(props) {
    let isMobile = props.isMobile;
    var cart = props.cart;
    if (!cart) return (<div className="main-content"><div className="info-block">Something's amiss! Your cart information found, please try again!</div></div>);

    if (!cart.orderItems || cart.orderItems.length == 0) return (<div className="main-content"><div className="info-block">You have no items in your cart yet!</div></div>)

    let flexDir = isMobile ? "column" : "row";

    return (
        <div className="main-content">
            <div><h2>Your Cart</h2></div>
            <div style={{display:"flex", alignItems: "flex-start", justifyContent: "space-evenly", flexDirection: flexDir}}>                
                <div style={{display:"flex", flexDirection: "column"}}>
                    {cart.orderItems.map(oi=>{
                        return (<OrderItemCard itemId={oi.itemId} quantity={oi.quantity} setCartCallback={props.setCartCallback} isMobile={isMobile}/>)
                    })}
                    {isMobile && <CartTotal isMobile={isMobile} cart={cart}/>}
                </div>
                {!isMobile && <CartTotal isMobile={isMobile} cart={cart}/>}
            </div>
        </div>
    )
}

function OrderItemCard(props) {
    var isMobile = props.isMobile;
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
    }, [itemId]);

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

    let cardWidth = isMobile ? "100%" : "500px";
    let picSize = isMobile ? "100px" : "175px";

    return (
        <div key={itemDetail.itemId} className="order-item-card" style={{width: cardWidth}}>
            <div>
                <img style={{margin: "15px", width: picSize, height: picSize}} src={itemDetail.imageUrl}/>
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

function CartTotal(props) {
    let isMobile = props.isMobile;
    let cart = props.cart;
    let cartTotalWidth = isMobile ? "100%" : "200px"
    return (
        <div style={{border:"1px solid var(--smoke)", width: cartTotalWidth, padding: "10px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
                <h3 style={{marginTop:"0px",marginBottom:"10px"}}>Cart Summary</h3>
                <div>
                    <div>Total Cost: {new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(cart.orderTotal)}</div>
                </div>
            </div>
            <div>
                <a href="/#/checkOut"><button style={{margin: "10px 0px 5px 0px", width: "100%"}} className="button btn-black-white">Proceed</button></a>
            </div>
        </div>
    )
} 
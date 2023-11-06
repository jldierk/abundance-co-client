import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonWithLoad from "../components/ButtonWithLoad";

export default function ProductView(props) {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [itemArr, setItemArr] = useState([]);
    const [itemQuant, setQuantity] = useState(1);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const location = useLocation();
    var product = location.state.product;
    var isMobile = props.isMobile;
    if (!product) {return (<div>Product Not Found</div>)}
    
    let cart = props.cart;
    let item = itemArr[0];
    let imageSize = isMobile ? "200px" : "400px";
    let detailsFlexDir = isMobile ? "column" : "row";

    function handleQuantityChange(event) {
        var quantity = event.target.value;
        setQuantity(quantity);
        setSaved(false);
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
        setSaving(true);
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
        .then(json=>{
            props.updateCart(json); 
            setSaving(false);
            setSaved(true);
        })
        .then(console.log("Added item to cart"))
        .catch(err => {console.log("Error " + err.json)});
    }
    
    return (
        <div className="main-content" style={{display:"flex"}}>        
            <div style={{flex: 1, display: "flex", alignItems:"center", justifyContent: "space-evenly", flexDirection: detailsFlexDir}}>
                <div style={{flex: 3, textAlign:"center"}}>
                    <img style={{height: imageSize, width:imageSize, borderRadius:"15px", border: "1px solid var(--smoke)"}} src={product.imageUrl}></img>
                </div>
                <div style={{flex: 2}}>
                    <h1 style={{textAlign:"center"}}>{product.productName}</h1>
                    <table style={{border: "none"}}>        
                        {product.scents && <tr><td className="product-label">Scents:</td><td>{product.scents.map(scent=>scent.scentName).join(", ")}</td></tr>}
                        <tr><td className="product-label">Description:</td><td>{product.description}</td></tr>
                        
                        {item && <tr><td className="product-label">Size: </td><td>{item.size}</td></tr>}
                        {item && <tr><td className="product-label">Price: </td><td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item.price)}</td></tr>}
                    </table>
                    <AddToCartButton onChangeQuantity={handleQuantityChange} cart={cart} item={item} addToCartAction={addToCart} quantity={itemQuant} saving={saving} saved={saved}/>                                        
                </div>
            </div>
        </div>
    )
}

function AddToCartButton(props) {
    var cart = props.cart;
    var item = props.item;
    var quantity = props.quantity;
    var saved = props.saved;

    if (!item) {
        return (<div><i>This product cannot be added to you cart because it does not have items associated with it.</i></div>)
    }

    useEffect(() => {},[props.saving])

    var numInStock = item.numInStock;
    if (cart && cart.orderItems && cart.orderItems.some(oi=>oi.itemId == item.id)) {
        return (
            <React.Fragment>
                <tr>
                    <td className="product-label">
                        {numInStock > 0 &&
                            <select style={{width:"40px"}} onChange={props.onChangeQuantity.bind(this)} value={quantity}>
                            {
                                (() => {
                                const options = [];
                                for (let i = 0; i <= numInStock; i++) {
                                    options.push(<option key={"quant_" + i} value={i}>{i}</option>);
                                }
                                return options;})()
                            }
                            </select>
                        }                    
                    </td>
                    <td>
                        {!saved && <ButtonWithLoad height="30px" buttonLabel="Update Quantity" onClickFunction={() => props.addToCartAction(item)} loading={props.saving}/>}
                        {saved && <span>Cart Updated!</span>}
                    </td>
                </tr>
            </React.Fragment>
        )
    } else {
        if (numInStock > 0) {
            return (<button className="button btn-black-white" style={{marginTop: "15px", marginBottom: "15px"}} onClick={() => {props.addToCartAction(item)}}>Add To Cart</button>)
        } else {
            return (<div><i>This product is currently out of stock. Check back soon!</i></div>)
        }
    }
}
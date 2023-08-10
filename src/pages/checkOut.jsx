import React, { useState } from "react";
import ButtonWithLoad from "../components/ButtonWithLoad";

export default function CheckOut(props) {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");
    const [email, setEmail] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const emailRegExp = new RegExp("\\S+@\\S+\\.\\S+");
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);

    var cart = props.cart;
    if (submitted) return (<div className="main-content"><OrderSubmitted/></div>);
    else if (!cart || !cart.orderItems) return (<div className="main-content"><div className="info-block">No cart information found</div></div>);
    
    let shippingCost = deliveryMethod == "DELIVERY" ? 10 : 0;
    
    function changeDeliveryMethod(e) {
        setDeliveryMethod(e.target.value);
    }

    function updateEmail(email) {
        setInvalidEmail(false);
        setEmail(email);
    }

    function submitOrder() {
        if (!email || email.length == 0 || !emailRegExp.test(emailRegExp)) {
            setInvalidEmail(true);
            return;
        }
        
        setSaving(true);
        let uri = BACKEND_BASE_URL + "/api/v1/orders/cart/submit"
        fetch(uri, {  
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userEmail: email, deliveryMethod: deliveryMethod})
        })
        .then(response => response.json())
        .then(json => {
            props.setCartCallback(null);
            setSubmitted(true);
            setSaving(false);
        }) //null out the cart
        .catch(error => console.error(error));
    }

    var invalidEmailClass = invalidEmail ? "validation-error" : "";

    return (
        <div className="main-content">     
            <div style={{display:"flex", justifyContent: "center"}}>
                <div style={{width:"300px"}}>
                    <h2 style={{textAlign:"center", margin:"0px"}}>Check Out</h2>
                    <div className="warning" style={{marginTop: "5px"}}>This website will not take any payment information directly. We will contact you directly to organize payment and delivery.</div>
                    <table style={{border: "none"}}>
                        <tr>
                            <td className="label">Order Subtotal:</td>
                            <td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(cart.orderTotal)}</td>
                        </tr>
                        <tr>
                            <td className="label">Shipping Cost</td>
                            <td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(shippingCost)}</td>
                        </tr>
                        <tr>
                            <td className="label">Order Total:</td>
                            <td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(cart.orderTotal + shippingCost)}</td>
                        </tr>
                        <tr>
                            <td className="label">Email:</td>
                            <td>
                                <input className={"admin-input " + invalidEmailClass} style={{width:"150px"}} type="text" id="email" name="email" onChange={(e) => {updateEmail(e.target.value)}} value={email}/>
                                {invalidEmail && <div className="error-message">Please enter an email address to submit your order</div>}
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Delivery Method:</td>
                            <td>
                                <select style={{marginRight:"15px", width:"160px"}} onChange={changeDeliveryMethod.bind(this)} value={deliveryMethod}>
                                    <option key="delivery_1" value="DELIVERY">Delivery</option>
                                    <option key="delivery_2" value="PICK_UP">Pick Up</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><ButtonWithLoad height="30px" buttonLabel="Submit Order" onClickFunction={() => submitOrder()} loading={saving}/></td>
                        </tr>
                    </table>                
                </div>   
            </div>
        </div>
    )
}


function OrderSubmitted() {
    return (
        <div className="info-block">
            Thank you for your order! Abundance will be in contact with you shortly to arrange shipping and collect payment.
        </div>
    )
}
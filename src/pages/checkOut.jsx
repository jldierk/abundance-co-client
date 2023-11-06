import React, { useEffect, useState } from "react";
import ButtonWithLoad from "../components/ButtonWithLoad";

export default function CheckOut(props) {
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const emailRegExp = new RegExp("\\S+@\\S+\\.\\S+");

    const [errorMessage, setErrorMessage] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [address, setAddress] = useState({});
    const [comments, setComments] = useState("");

    var cart = props.cart;
    if (submitted) return (<div className="main-content"><OrderSubmitted/></div>);
    else if (!cart || !cart.orderItems) return (<div className="main-content"><div className="info-block">No cart information found</div></div>);
    else if (errorMessage) return (<div className="main-content"><div className="info-block">{errorMessage}, please try again</div></div>);
    
    let isDelivery = deliveryMethod == "DELIVERY";
    let shippingCost = isDelivery ? 10 : 0;
    
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
        
        setErrorMessage(null);
        setSaving(true);
        let uri = BACKEND_BASE_URL + "/api/v1/orders/cart/submit"
        fetch(uri, {  
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: name, userEmail: email, deliveryMethod: deliveryMethod, address: address, comments: comments})
        })
        .then(response => {
            if (response.ok) {
                return response.json();                
            } else {
                response.json().then(obj => {
                    setSubmitted(false);
                    setSaving(false);
                    setErrorMessage(obj.message);
                })
            }
        })
        .then(response=>response.json)
        .then(json => {
            props.setCartCallback(null);
            setSubmitted(true);
            setSaving(false);
        }) //null out the cart
        .catch(error => {
            setSubmitted(false);
            setSaving(false);
            setErrorMessage(error.message);
            console.error(error.message);
        });
    }

    var invalidEmailClass = invalidEmail ? "validation-error" : "";

    if (errorMessage) {

    }

    return (
        <div className="main-content">     
            <div style={{display:"flex", justifyContent: "center"}}>
                <div style={{width:"300px"}}>
                    <h2 style={{textAlign:"center", margin:"0px"}}>Check Out</h2>
                    {errorMessage != null && <div className="warning" style={{marginTop: "5px"}}>{errorMessage}</div>}
                    <div className="warning" style={{marginTop: "5px"}}>This website will not take any payment information directly. We will contact you directly to organize payment and delivery.</div>
                    <table style={{border: "none"}}>
                        <tr>
                            <td className="label">Delivery Method:</td>
                            <td>
                                <select style={{marginRight:"15px", width:"160px"}} onChange={changeDeliveryMethod.bind(this)} value={deliveryMethod}>
                                    <option key="delivery_1" value="DELIVERY">Delivery</option>
                                    <option key="delivery_2" value="PICK_UP">Pick Up</option>
                                </select>
                            </td>
                        </tr>
                        {isDelivery && <AddressInput onChange={setAddress} address={address}/>}
                        {!isDelivery && <PickupComments onChange={setComments} comments={comments}/>}
                        <tr>
                            <td className="label">Name:</td>
                            <td>
                                <input className="admin-input" style={{width:"150px"}} type="text" id="name" name="name" onChange={(e) => {setName(e.target.value)}} value={name}/>                                
                            </td>
                        </tr>
                        <tr>
                            <td className="label">Email:</td>
                            <td>
                                <input className={"admin-input " + invalidEmailClass} style={{width:"150px"}} type="text" id="email" name="email" onChange={(e) => {updateEmail(e.target.value)}} value={email}/>
                                {invalidEmail && <div className="error-message">Please enter an email address to submit your order</div>}
                            </td>
                        </tr>                        
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
                            <td></td>
                            <td><ButtonWithLoad height="30px" buttonLabel="Submit Order" onClickFunction={() => submitOrder()} loading={saving}/></td>
                        </tr>
                    </table>                
                </div>   
            </div>
        </div>
    )
}

function PickupComments(props) {
    return (
        <React.Fragment>
            <tr>
                <td className="label">When is best to pickup the order?:</td>
                <td><textarea className={"admin-input "} style={{width:"150px", height:"50px"}} onChange={(e) => {props.onChange(e.target.value)}} value={props.comments}/></td>
            </tr>
        </React.Fragment>
    )
}

function AddressInput(props) {
    const [addressLine1, setAddressLine1] = useState(props.address.addresssLine1);
    const [addressLine2, setAddressLine2] = useState(props.address.addresssLine2);
    const [city, setCity] = useState(props.address.city);
    const [state, setState] = useState(props.address.state);
    const [zip, setZip] = useState(props.address.zip);

    useEffect(() => {props.onChange(getAddress())}, [addressLine1, addressLine2, city, state, zip]);

    function getAddress() {
        return {
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zip: zip,
        }
    }

    return (
        <React.Fragment>
            <tr>
                <td className="label">Address Line 1:</td>
                <td><input className={"admin-input "} style={{width:"150px"}} type="text" onChange={(e) => {setAddressLine1(e.target.value)}} value={addressLine1}/></td>
            </tr>
            <tr>
                <td className="label">Address Line 2:</td>
                <td><input className={"admin-input "} style={{width:"150px"}} type="text" onChange={(e) => {setAddressLine2(e.target.value)}} value={addressLine2}/></td>
            </tr>
            <tr>
                <td className="label">City:</td>
                <td><input className={"admin-input "} style={{width:"150px"}} type="text" onChange={(e) => {setCity(e.target.value)}} value={city}/></td>
            </tr>
            <tr>
                <td className="label">State:</td>
                <td><input className={"admin-input "} style={{width:"50px"}} type="text" onChange={(e) => {setState(e.target.value)}} value={state}/></td>
            </tr>
            <tr>
                <td className="label">Zip Code:</td>
                <td><input className={"admin-input "} style={{width:"50px"}} type="text" onChange={(e) => {setZip(e.target.value)}} value={zip}/></td>
            </tr>
        </React.Fragment>
    )
}


function OrderSubmitted() {
    return (
        <div className="info-block">
            Thank you for your order!
        </div>
    )
}
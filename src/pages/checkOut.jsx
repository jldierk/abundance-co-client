import React, { useState } from "react";

export default function CheckOut(props) {

    const [deliveryMethod, setDeliveryMethod] = useState("DELIVERY");
    var cart = props.cart;
    if (!cart || !cart.orderItems) return (<div>No cart information found</div>);

    let shippingCost = deliveryMethod == "DELIVERY" ? 10 : 0;

    function changeDeliveryMethod(e) {
        setDeliveryMethod(e.target.value);
    }

    function submitOrder() {

    }

    return (
        <div className="main-content">     
            <div style={{display:"flex", justifyContent: "center"}}>
                <div style={{width:"300px"}}>
                    <h2 style={{textAlign:"center"}}>Check Out</h2>
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
                            <td><input className="admin-input" style={{width:"150px"}} type="text" id="email" name="email"/></td>
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
                            <td><button className="button btn-black-white" style={{marginTop: "15px", marginBottom: "15px"}} onClick={submitOrder()}>Submit Order</button></td>
                        </tr>
                    </table>                
                </div>   
            </div>
        </div>
    )
}

function Shipping(props) {
    return (
        <tr>
            <td>Shipping Cost</td>
            <td>$10.00</td>
        </tr>
    )
}
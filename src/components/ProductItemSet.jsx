import React, { useEffect, useState } from "react";

const ProductItemSet = (props) => {
    let product = props.product;
    if (!product) return (<div></div>);
    const [itemArr, setItemArr] = useState([]);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products/" + product.id + "/items"
        fetch(uri)
          .then(response => response.json())
          .then(json => setItemArr(json))
          .catch(error => console.error(error));
    }, [itemArr]);

    return (
        <div>
            <table>
                <tr>
                    <th>Size</th>
                    <th>Price</th>
                </tr>
                {itemArr && itemArr.length > 0 && itemArr.map(item=>
                <tr>
                    <td>{item.size}</td>
                    <td>{new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(item.price)}</td>
                </tr>)}
            </table>
        </div>
    )

}

export default ProductItemSet
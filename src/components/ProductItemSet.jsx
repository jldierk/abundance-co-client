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
    }, [product]);

    function addNewItem() {
        setItemArr(items => [...items, {}]);
    }

    return (
        <div>
            <h3>Item List</h3>
            {itemArr && itemArr.length > 0 && itemArr.map(item=><ItemDetails item={item} productId={product.id}/>)}
            <button className="button btn-black-white" onClick={addNewItem}>Add New</button>
        </div>
    )
}

function ItemDetails(props) {
    var item = props.item;
    var productId = props.productId;
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    const [itemSize, setItemSize] = useState(item.size);
    const [itemPrice, setItemPrice] = useState(item.price);

    useEffect(() => { 
        setItemSize(item.size || "10 oz.");
        setItemPrice(item.price || "");
    }, [item.size, item.price] )


    function saveItem() {
        item.size = itemSize;
        item.price = itemPrice;
        item.productId = productId;

        const requestOptions = {    
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          };
          let url = BACKEND_BASE_URL + '/api/v1/products/' + productId + "/items";
          fetch(url, requestOptions)
            .then(response=>response.json())
            .then(data=> {
              console.log("Saved item data: " + data);            
            })
            .catch(err => {console.log("Error " + err.json)});
    }

    return (
        <div style={{marginTop:"10px"}}>
            <span>
                <select style={{marginRight:"15px", width:"100px"}} onChange={(e) => {setItemSize(e.target.value)}} value={itemSize}>
                    <option key="tenoz" value="10 oz.">10 oz.</option>
                </select>
            </span>
            <span>
                <input className="admin-input" style={{width:"100px"}} type="text" id="price" name="price" value={itemPrice} onChange={(e) => {setItemPrice(e.target.value)}}/>
            </span>
            <span>
                <button className="button btn-black-white" style={{marginLeft:"10px"}} onClick={() => saveItem()}>Save Item</button>
            </span>
        </div>
    )
}

export default ProductItemSet
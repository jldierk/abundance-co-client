import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
    const [productArr, setProductArr] = useState([]);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products"
        fetch(uri)
          .then(response => response.json())
          .then(json => setProductArr(json))
          .catch(error => console.error(error));
    }, []);

    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>
            {productArr.map(product=><ProductCard product={product}></ProductCard>)}            
        </div>
    )
}
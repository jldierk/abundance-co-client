import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const [productArr, setProductArr] = useState([]);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const navigate = useNavigate();

    const toProductView=(productToView)=>{
        navigate('/product',{state:{product: productToView}});
    }

    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products"
        fetch(uri)
          .then(response => response.json())
          .then(json => setProductArr(json))
          .catch(error => console.error(error));
    }, []);

    return (
        <div style={{backgroundColor: "var(--background)"}}>        
            {/* <div className="info-block">Abundance Candles are hand-poured in Chicago, Illinois.</div> */}
            {/* <img src="src/assets/images/abundance-banner.jpg" style={{width: "100vw"}}></img>         */}
            <div className="main-content">               
                <div style={{display:"flex", width:"100%", justifyContent:"center"}}>
                    <div style={{display: "flex", width:"910px", flexWrap:"wrap", justifyContent: "space-evenly", margin:"50px"}}>            
                        {productArr.map(product=><div><a onClick={()=>{toProductView(product)}}><ProductCard product={product}></ProductCard></a></div>)}            
                    </div>
                </div>
            </div>            
        </div>
    )
}
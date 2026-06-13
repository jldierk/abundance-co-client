import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import instagramLogo from "../assets/instagram.svg"

export default function Home() {
    const [productArr, setProductArr] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const navigate = useNavigate();

    const toProductView=(productToView)=>{
        navigate('/product',{state:{product: productToView}});
    }

    useEffect(() => {
        let uri = BACKEND_BASE_URL + "/api/v1/products"
        fetch(uri)
          .then(response => response.json())
          .then(json => {setProductArr(json)})
          .catch(error => {
            //setErrorMsg(uri + ", Error: " + JSON.stringify(error));
            console.error(error);
        });
    }, []);

    if (errorMsg) {
        return (
            <div className="main-content">   
                <div> ERROR: {errorMsg} </div>
            </div>
        )
    }

    return (
        <div style={{backgroundColor: "var(--secondaryColor)", flex: 1, alignContent: "center"}}>        
            {/* <div className="info-block">Abundance Candles are hand-poured in Chicago, Illinois.</div> */}
            {/* <img src="src/assets/images/abundance-banner.jpg" style={{width: "100vw"}}></img>         */}
            <div className="main-content" style={{backgroundColor: "var(--secondaryColor)"}}>               
                <div style={{display:"flex", width:"100%", justifyContent:"center", textAlign:"center", color:"var(--navTextColor)", fontSize:"20px"}}>
                    <b>Abundance Candle Co. is currently offline, but candles are still being poured! <br/>
                    Reach out on Instagram @abundance_candle_co if you'd like to know more.</b>
                    {/* <div style={{display: "flex", width:"910px", flexWrap:"wrap", justifyContent: "space-evenly", margin:"50px"}}>            
                        {productArr.filter(product=>product.activeInd == true)
                                    .map(product=><div key={product.id}><a onClick={()=>{toProductView(product)}}><ProductCard key={product.id} product={product}></ProductCard></a></div>)}            
                    </div> */}
                </div>            
            </div>            
        </div>
    )
}
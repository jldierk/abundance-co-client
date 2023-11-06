import React from "react";

const ProductCard = (props) => {
    let product = props.product;
    if (!product) {
        return(<div></div>);
    }

    let scents = product.scents;
    let outOfStock = product.items.every(item=> !item.numInStock || item.numInStock == 0);
    let productClass = outOfStock ? "product-image grayscale" : "product-image";
    return (
        <div className="product-card" key={product.id}>
            <div className="image-wrapper">                
                <img className={productClass} src={product.imageUrl}></img>                                        
                {outOfStock && <div className="product-card-overlay outline">            
                    <div style={{display: "flex", flex: "1", flexDirection: "column", alignItems: "center", justifyContent: "center",
                     height: "250px", fontWeight: "bold", fontSize:"20px", letterSpacing:"1px"}}>
                        <div style={{display: "flex", flex:"1", alignItems: "center", justifyContent: "center"}}></div>
                        <div style={{display: "flex", flex:"1", alignItems: "center", justifyContent: "center"}}><div style={{backgroundColor: "black", padding:"3px"}}>SOLD OUT</div></div>
                    </div>
                </div>}
                <div className="product-card-overlay scent-overlay">
                    <div style={{opacity: "1", display: "flex", flex: "1", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "250px"}}>
                        {scents && scents.map(scent=> <div key={scent.id}>{scent.scentName}</div>)}
                    </div>
                </div>
            </div>
            <div style={{margin: "5px 0px 5px 0px"}}>
                <div><b>{product.productName}</b></div>
                {/* <div>{product.description}</div> */}
            </div>
        </div>
    )
}

export default ProductCard;
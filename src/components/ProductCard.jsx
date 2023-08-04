import React from "react";

const ProductCard = (props) => {
    let product = props.product;
    if (!product) {
        return(<div></div>);
    }

    let scents = product.scents;

    return (
        <div className="product-card">
            <div className="image-wrapper">                
                <img className="product-image" src={product.imageUrl}></img>
                <div className="scent-overlay">
                    <div style={{opacity: "1", display: "flex", flex: "1", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "250px"}}>
                        {scents.map(scent=> <div>{scent.scentName}</div>)}
                    </div>
                </div>
            </div>
            <div style={{margin: "5px 0px 5px 0px"}}>
                <div><b>{product.productName}</b></div>
                <div>{product.description}</div>
            </div>
        </div>
    )
}

export default ProductCard;
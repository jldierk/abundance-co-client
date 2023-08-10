

function ButtonWithLoad (props) {
    var loading = props.loading;

    return (
        <div style={{display:"inline-block", alignItems: "center", justifyContent: "center"}}>
            {!loading && <button className="button btn-black-white" style={{width: "100%", height: "100%"}} onClick={() => props.onClickFunction()}>{props.buttonLabel}</button>}
            {loading && <div className="spinner rotate" style={{height:props.height, width: props.width}}></div>}
        </div>
    )

}

export default ButtonWithLoad;
import CartIcon from "../assets/cart.svg"
import AbundanceSolo from "../assets/abundance-solo.svg"

const NavBar = (props) => {
    var cart = props.cart;
    var user = props.user;
    const BACKEND_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
  
    var cartCount = 0;
    if (cart && cart.orderItems) {
        let orderItemArr = cart.orderItems;
        for (var i = 0; i < orderItemArr.length; i++) {
            var orderItem = orderItemArr[i];
            cartCount += (orderItem && orderItem.quantity) ? orderItem.quantity : 0;
        }
    }

    function logout() {
        const requestOptions = {    
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          };
          let url = BACKEND_BASE_URL + '/api/v1/users/logout';
          fetch(url, requestOptions)            
            .then(data=> {
              console.log("Logged out User");
              props.setUserCallback(null);
            })
            .catch(err => {console.log("Error " + err.json)});
    }

    return (
        <div className="nav-bar" style={{color: "var(--navTextColor)"}}>
            <div className="nav-content">
                <div className="navbar-item" style={{flex: 1}}>
                    <a href="/"><img style={{width:"100%", maxWidth:"300px"}} src={AbundanceSolo}/></a>
                </div>
                {/* <div className="navbar-item" style={{flex: 1, justifyContent: "center", textAlign: "center"}}></div> */}
                <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "right"}}>                    
                    { cart &&
                        <div className="navbar-item" style={{display:"flex", alignItems:"center"}}>
                            <a href="/#/cart">
                                <div style={{display:"flex", alignItems: "center"}}>
                                    <img src={CartIcon}/>
                                    <div><span>Cart</span><span className="bubble-text">{cartCount}</span></div>
                                </div>
                            </a>
                        </div>
                    }

                    {
                        user && user.userType == "ADMIN" &&    
                        <div className="navbar-item">
                            <a href="/#/admin"><button className="button btn-nav-colors">Admin Console</button></a>
                            <button className="button btn-nav-colors" style={{marginTop: "15px", marginBottom: "15px"}} onClick={logout.bind(this)}>Logout</button>                        
                        </div>
                    }
                
                    {/* We're not going to allow users to login, people can just check in as guests
                     <div className="navbar-item">
                        <LoginButton user={user}/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;
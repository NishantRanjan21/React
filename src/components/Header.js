import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Logo = new URL('../../images/resLogo.png', import.meta.url);
const Header = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  // using useSelector Hook so that we can read the cart value
  const cartItems = useSelector((store) => store.cart.items);

  // total quantity
  const totalCount = cartItems.reduce((acc, it) => acc + (it.quantity || 0), 0);

  console.log(cartItems);
  return (
    <div className="header">
      <div className="Logo-container">
        <img className="logo" src={Logo} />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">About Us</Link></li>
          <li><Link to="contact">Contact Us</Link></li>
          <li><Link to="Cart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6.00488 9H19.9433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V9ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>
          {totalCount} </Link></li>
          <button className="login" onClick={() => {
            btnNameReact === "Login" ? setbtnNameReact("Logout") : setbtnNameReact("Login");
          }}>
            {btnNameReact}
          </button>
          <svg className="hamburger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
        </ul>
      </div>
    </div>
  )
};

export default Header;

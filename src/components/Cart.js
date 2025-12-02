import { clearCart, addItem, decreaseItem, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuCDN_URL } from "../utils/constants";
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => (store.cart.items));

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncrease = (cartEntry) => {
        dispatch(addItem(cartEntry.item));
    };

    const handleDecrease = (id) => {
      dispatch(decreaseItem(id));
    };

    const handleRemove = (id) => {
      dispatch(removeItem(id));
    }

    const cartTotal = cartItems.reduce((sum, entry) => {
    const price = (entry.item?.finalPrice ?? entry.item?.price ?? entry.item?.defaultPrice ?? 0) / 100;
    return sum + price * entry.quantity;
  }, 0);

  return (
    <div className="cartContainer">
      {cartItems.length === 0 ? (
        <h1>The cart is empty</h1>
      ) : (
        <div className="cartContent">
          
          <div className="ClearcartBtn">
            <button onClick={handleClearCart}>Clear Cart</button>
          </div>

          
          {cartItems.map((cartEntry) => {
            const { id, item, quantity } = cartEntry;
            const unitPrice = (item?.finalPrice ?? item?.price ?? item?.defaultPrice ?? 0) / 100;
            return (
              <div className="Cartmenu-item" key={id} >
                <div className="Cartmenu-content">
                  <h4>{item?.name}</h4>
                  <p>
                    ₹{unitPrice} x {quantity} = ₹{(unitPrice * quantity).toFixed(2)}
                  </p>
                </div>

                <div className="Cartimage-container">
                  <img
                    className="Cartmenu-logo"
                    src={MenuCDN_URL + item?.imageId}
                    alt={item?.name}
                  />

                  {/* Quantity controls */}
                  <div className="OprationalBtn">
                    <button onClick={() => handleDecrease(id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleIncrease(cartEntry)}>+</button>
                    <button onClick={() => handleRemove(id)}>Remove</button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Optional total display */}
          <div className="TotalDisplay">
            <strong>Total: ₹{cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};


export default Cart;
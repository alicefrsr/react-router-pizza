// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";

import { clearCart, getCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";
import EmptyCart from "./EmptyCart";

import { getTotalCartQty, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  // const cart = fakeCart;
  const cart = useSelector(getCart);
  // console.log(cart);
  const username = useSelector(getUsername);
  const dispatch = useDispatch();

  // get totals from slice
  const totalCartQuantity = useSelector(getTotalCartQty);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // if (cart.length === 0) return <EmptyCart />;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mb-[148px]  mt-[100px] flex justify-center ">
      <div className=" w-[90%] px-4 py-3 sm:w-2/3 lg:w-1/2 ">
        {/* <div className=" w-5/6 sm:w-2/3 lg:w-1/2 "> */}
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
        <ul className="mt-3 divide-y  divide-stone-200 border-b">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>

        <div className="py-8 sm:flex sm:items-center sm:justify-between">
          <p className="mb-2 font-semibold sm:mb-0">
            {totalCartQuantity} &times;{" "}
            {totalCartQuantity === 1 ? "pizza" : "pizzas"}
          </p>
          <p className="flex items-center justify-between border-y-2 border-stone-700 py-2 font-semibold sm:gap-6">
            Total: {formatCurrency(totalCartPrice)}
          </p>
        </div>
        <div className="mt-6 space-x-2">
          <Button type="primary" to="/order/new">
            Order {totalCartQuantity === 1 ? "pizza" : "pizzas"}
          </Button>
          {/* <Link to="/order/new">Order pizzas</Link> */}
          <Button type="secondary" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

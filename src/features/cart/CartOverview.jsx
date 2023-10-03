import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getTotalCartQty, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(
    // (state) => state.cart.cart.reduce((qtySum, item) => qtySum + item.quantity, 0),
    // extract it to the cartSlice as
    getTotalCartQty,
  );

  const totalCartPrice = useSelector(
    // (state) =>  state.cart.cart.reduce((totalPriceSum, item) => totalPriceSum + item.totalPrice, 0),
    // extract it to the cartSlice as
    getTotalCartPrice,
  );

  const location = useLocation();
  if (!totalCartQuantity || location.pathname === "/cart") return null;

  return (
    <div className="absolute bottom-[92px] z-20 lg:bottom-[56px]">
      <div className="flex w-screen items-center justify-between bg-green-800 px-4 py-2 uppercase text-stone-200">
        <p className="space-x-6 text-xs font-semibold text-stone-300 sm:space-x-4 md:text-base">
          <span className="wrap">
            Your order: {totalCartQuantity}{" "}
            {totalCartQuantity === 1 ? "pizza" : "pizzas"}
          </span>
          <br />
          <span>Total: {formatCurrency(totalCartPrice)}</span>
        </p>

        <Link
          className=" hover: rounded-full border-2 border-stone-300 px-4 py-2 hover:bg-green-700"
          to="/cart"
        >
          Open cart
        </Link>
      </div>
    </div>
  );
}

export default CartOverview;

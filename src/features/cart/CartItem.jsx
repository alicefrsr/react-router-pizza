// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "./DeleteItem";
import UpdateItemQty from "./UpdateItemQty";
import { getCurrentItemQuantityById } from "./cartSlice";
// import Button from "../../ui/Button";

// import { deleteItem } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  // console.log(item);
  // we can get quantity passed down as prop from Cart but this won't work when we need to have the UpdateItemQty comp in MenuItem where we won't have access to quantity prop, where we will have to do this anyway:
  const currentQuantity = useSelector(getCurrentItemQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-3">
      <p className="mb-1 sm:mb-0">
        {quantity} &times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;

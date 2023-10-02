import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQty from "../cart/UpdateItemQty";

import { formatCurrency } from "../../utils/helpers";

import {
  addItem,
  // getCurrentItemById,
  getCurrentItemQuantityById,
} from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentItemQuantityById(id));
  const isInCart = currentQuantity > 0;

  // const itemAlreadyInCart = useSelector(getCurrentItemById(id)); // no need if we are using qty

  const handleAddToCart = () => {
    // console.log(pizza); // we don't want all the existing props, re-model the object we pass in
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-28 rounded-md ${soldOut ? "opacity-80 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="mb-2 text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm ">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sorry, sold out!
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQty pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <>
              <Button type="small" onClick={handleAddToCart}>
                add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;

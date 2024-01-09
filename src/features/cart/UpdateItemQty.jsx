import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQty, increaseItemQty } from "./cartSlice";

function UpdateItemQty({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="ml-2 flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQty(pizzaId))}>
        -
      </Button>
      <span className="text-xs font-medium sm:text-sm">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQty(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQty;

import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  //   const handleDeleteItem = (id) => {
  //     dispatch(deleteItem(id));
  //   };

  return (
    // <Button type="small" onClick={() => handleDeleteItem(pizzaId)}>
    //   Delete
    // </Button>
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Remove
    </Button>
  );
}

export default DeleteItem;

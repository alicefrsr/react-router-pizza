import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="mb-[148px]  mt-[100px] flex justify-center ">
      <div className=" px-4 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>

        <p className="mt-7 font-semibold">
          Your cart is empty. Start adding some pizzas :)
        </p>
      </div>
    </div>
  );
}

export default EmptyCart;

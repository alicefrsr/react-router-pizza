import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";

import { createOrder } from "../../services/apiRestaurant";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  // const username = useSelector((state) => state.user.username);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  // const isErrorAddress = errorAddress === "error";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  // console.log(navigation);

  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="mb-[148px] mt-[100px] flex justify-center">
      {/* <div className="w-3/5 px-4 py-6"> */}
      <div className="w-5/6 px-4 py-6  sm:w-2/3 lg:w-1/2">
        <h2 className="mb-8 text-xl font-semibold">
          Ready to order? Let&#39;s get to it!
        </h2>

        {/* <Form method='POST' action='/order/new'> */}
        <Form method="POST">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <input
              className="input grow"
              type="text"
              name="customer"
              defaultValue={username}
              required
            />
          </div>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-4 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="grow">
              <input
                className="input  w-full"
                type="text"
                name="address"
                required
                disabled={isLoadingAddress}
                defaultValue={address}
              />
              {addressStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-100 p-4 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[4px] top-[35px] sm:right-[3px] sm:top-[3px] md:right-[5px] md:top-[5px]">
                {" "}
                <Button
                  disabled={isSubmitting || isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  {isLoadingAddress ? "Searching..." : "Get position"}
                </Button>
              </span>
            )}
          </div>

          <div className="mb-12  flex  items-center gap-5">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label className="font-medium" htmlFor="priority">
              Want to give your order priority ? (extra 20% charge)
            </label>
          </div>
          {/* to pass in the cart data to the router action through the form  */}
          {/* JSON.stringify(cart) because cart is an object and we need a string */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <div>
            <Button type="primary" disabled={isSubmitting}>
              {isSubmitting
                ? "Placing order..."
                : `Order now | Total: ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData(); // formData() provided by the browser
  // convert into object
  const data = Object.fromEntries(formData);
  // console.log(data);
  // {customer: 'alice', phone: '12345678', address: '123 sesame street', priority: 'on', cart: '[{"pizzaId":12,"name":"Mediterranean","quantity":2…om","quantity":1,"unitPrice":15,"totalPrice":15}]'}
  // we want to model the data: priority true/false, cart back into an object etc
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);

  // error handling / formdata validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please enter your correct phone number, we might need it to contact you about your order.";
  // return errors if there's at least one prop in object
  if (Object.keys(errors).length > 0) return errors;

  //  else create new order + redirect
  const newOrder = await createOrder(order);

  // we can only call useDispatch in component, not here. Import store but do not overuse this hack
  store.dispatch(clearCart());
  // // we can't call hooks in fns, so we can't use navigate to go to newly created order page
  return redirect(`/order/${newOrder.id}`);
  // return null;
}
export default CreateOrder;

// Test ID: IIDSAT
// IYSFEE
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOrder } from "../../services/apiRestaurant";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

// const dummyOrder = {
//   id: 'ABCDEF',
//   customer: 'Jonas',
//   phone: '123456789',
//   address: 'Arroios, Lisbon , Portugal',
//   priority: true,
//   estimatedDelivery: '2027-04-25T10:00:00',
//   cart: [
//     {
//       pizzaId: 7,
//       name: 'Napoli',
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: 'Diavola',
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: 'Romana',
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: '-9.000,38.000',
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  console.log(order);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mb-[148px]  mt-[100px] flex items-center justify-center ">
      <div className="w-[90%] space-y-8 px-6 py-4 text-center sm:w-2/3 lg:w-1/2 ">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Your order #{id} status:</h2>

          <div className="space-x-2">
            <span className="text rounded-full bg-green-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-50 sm:text-sm">
              {status} order
            </span>
            {priority && (
              <span className="text rounded-full bg-red-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-50 sm:text-sm">
                Priority
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200  px-6 py-5">
          <p className="font-medium">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : "Order should have arrived"}
          </p>
          <p className="text-xs text-stone-500">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>
        <div className="space-y-2 bg-stone-200 px-6 py-5">
          <p className="text-sm font-medium text-stone-600">
            Price (pizzas): {formatCurrency(orderPrice)}
          </p>
          {priority && (
            <p className="text-sm font-medium text-stone-600">
              Price priority: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="font-bold">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>

        <ul className="divide-y divide-stone-200 border-b border-t  ">
          {cart.map((item) => (
            <OrderItem item={item} key={item.pizzaId} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;

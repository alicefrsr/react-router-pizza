import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  // console.log(menu.data.pizzas);

  return (
    <div className=" mb-[148px] mt-[61px] flex items-center justify-center bg-[#f7f2e9] ">
      <div className="flex flex-col items-center ">
        <h2 className="my-12 border-y-2 border-stone-500 py-2 text-center text-lg font-semibold uppercase tracking-wide sm:py-4 sm:text-2xl">
          Today&#39;s menu
        </h2>

        <ul className="divide-y divide-stone-200 px-2 ">
          {menu.map((pizza) => (
            // {menu.data.pizzas.map((pizza) => (
            <MenuItem pizza={pizza} key={pizza.id} />
            // <MenuItem pizza={pizza} key={pizza._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

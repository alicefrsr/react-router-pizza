import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    // <div className="my-10  px-4 text-center sm:my-16 ">
    // <div className="flex justify-center ">
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-[url('/nik-unsplash.jpg')] bg-cover bg-center pb-[180px] xs:gap-10  ">
      <h1 className="mt-24 rounded-lg bg-slate-900/30 p-4 text-xl font-semibold uppercase tracking-wide text-yellow-500 xs:mt-12 xs:text-3xl md:text-5xl md:tracking-widest lg:text-7xl">
        Get the best pizza.
      </h1>
      <p className="w-3/5 text-center text-xs text-stone-100 xs:text-base">
        Authentic italian cuisine. Straight out from our stone oven, all made
        with organic and local ingredients.
      </p>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to={"/menu"} type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
    // </div>
  );
}

export default Home;

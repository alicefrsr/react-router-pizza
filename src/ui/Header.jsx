import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <div className="absolute z-10">
      <header className="font-pizza flex  w-screen items-center justify-between border-b border-stone-300 bg-yellow-400 px-4 py-3  uppercase sm:px-6  ">
        <Link to="/" className="font-semibold tracking-widest">
          Chiara's pizza
        </Link>
        <SearchOrder />
        <UserName />
      </header>
    </div>
  );
}

export default Header;

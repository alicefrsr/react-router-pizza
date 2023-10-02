import { Outlet, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();
  //   console.log(navigation); // idle | loading | submitting
  const isLoading = navigation.state === "loading";
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  return (
    // <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
    <div className="flex h-screen flex-col bg-[#f7f2e9] ">
      {isLoading && <Loader />}

      <Header />
      <div className="h-full overflow-scroll">
        <main className="overflow-scroll">
          <Outlet />
        </main>
      </div>
      <CartOverview />
      <Footer />
    </div>
  );
}

export default AppLayout;

import { Header, Footer } from "../Components/Layout";
import {
  Home,
  Login,
  Register,
  MenuItemDetails,
  ShoppingCart,
  NotFound,
  AuthenticationTest,
  AuthenticationTestAdmin,
  AccessDenied,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { userModel } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";

function App() {
  const dispatch = useDispatch();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, id, email, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, id, email, role }));
    }
  }, []); //This useEffect should be executed whenever the app is rendered.

  useEffect(() => {
    if (!isLoading) {
      //Means if the loading has been completed
      console.log(data.result);
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]); //trigger useEffect() when [data] toggles. Or we we can also trigger on "isLoading"
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

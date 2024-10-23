import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiGetMe } from "./api/auth";
import { useEffect, useState } from "react";
import Contex from "./context";
import { useDispatch } from "react-redux";
import { setUserDetail } from "./redux/userSlice";
import { apiCountAddCartProduct } from "./api/cart";
function App() {
  const dispatch = useDispatch();

  const [cartProductCount, setCartProductCount] = useState(0)

  const getMe = async () => {
    const res = await apiGetMe();
    // console.log(res);
    if (res.success) {
      dispatch(setUserDetail(res.data));
    }
  };

  const getCartCount = async () => {
    const resp = await apiCountAddCartProduct()
    // console.log(resp);
    setCartProductCount(resp?.data?.count)

  }

  useEffect(() => {
    getMe();
    getCartCount()
  }, []);

  return (
    <>
      <Contex.Provider value={
        {
          getMe, // detalle del usuario logeado
          cartProductCount, //items de productos agregado al carrito del usuario logeado
          getCartCount // 
        }
      }
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Contex.Provider>
    </>
  );
}

export default App;

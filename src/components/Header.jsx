import { CircleUserRound, Search, ShoppingCart } from "lucide-react";
import { Logo } from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiLogout } from "../api/auth";
import { toast } from "react-toastify";
import { setUserDetail } from "../redux/userSlice";
import { useContext, useState } from "react";
import { ROLE } from "../helpers/constants";
import Context from "../context";

export function Header() {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  // console.log("user header", user);
  const dispatch = useDispatch();

  // cart
  const contex = useContext(Context)
  // console.log(contex);
  // search
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)


  const handleLogout = async () => {
    const resp = await apiLogout();
    if (resp.success) {
      toast.success(resp.message);
      dispatch(setUserDetail(null));
      navigate("/")
    }
    if (resp.error) toast.error(resp.message);
  };

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }

  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div>
          <Link to="/">
            <Logo w={32} h={32} c={"red"} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Buscar producto aqui"
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white bg-red-600"
          >
            <Search />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative group flex justify-center">

            {
              user?.id &&
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <CircleUserRound />
                )}
              </div>
            }



            {menuDisplay && user?.id && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded">
                <nav>
                  {
                    user?.role === ROLE.ADMIN ? (
                      <Link
                        to={"/admin-panel/dashboard"}
                        className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                        onClick={() => setMenuDisplay(preve => !preve)}
                      >
                        Administrar
                      </Link>
                    ) : (
                      <Link
                        to={"/admin-user/perfil"}
                        className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                      >
                        Perfil
                      </Link>
                    )
                  }
                </nav>
              </div>
            )}
          </div>

          {
            user?.id && (
              <Link to={"/cart"} className="text-2xl relative">
                <span>
                  <ShoppingCart />
                </span>
                <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                  <p className="text-sm">{contex.cartProductCount}</p>
                </div>
              </Link>
            )
          }

          <div>
            {user?.id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

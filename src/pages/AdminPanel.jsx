import { CircleUserRound } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { ROLE } from "../helpers/constants";

export function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/")
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] lg:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-md">
        <div className="h-32 flex justify-center items-center flex-col">
          <div
            className=" text-5xl cursor-pointer relative flex justify-center mt-8"
            onClick={() => setMenuDisplay((prev) => !prev)}
          >
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <CircleUserRound size={64} />
            )}
          </div>
          <p className="capitalize text-lg font-bold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* navegacion */}
        <div>
          <nav className="grid p-4 mt-8">
            <Link to={"/admin-panel/all-users"} className="px-2 py-1 hover:bg-slate-100">Usuarios</Link>
            <Link to={"/admin-panel/all-products"} className="px-2 py-1 hover:bg-slate-100">Productos</Link>
          </nav>
        </div>

      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
}

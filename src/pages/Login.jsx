import { Eye, EyeOff } from "lucide-react";
import gifLogin from "../assets/signin.gif";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apisignIn } from "../api/auth";
import { toast } from "react-toastify";
import Contex from "../context";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { getMe, getCartCount } = useContext(Contex);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const hanleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await apisignIn(inputs);
    setIsLoading(false);
    if (res.success) {
      toast.success(res.message);
      navigate("/");
      getMe();
      getCartCount()
    }
    if (res.error) toast.error(res.message);
  };

  // console.log(inputs);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className=" bg-white p-5 w-full max-w-sm mx-auto">
          <div className="mx-auto w-20 h-20">
            <img src={gifLogin} alt="logo" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={hanleOnSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingrese su correo"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnchange}
                  value={inputs.email}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Ingrese su password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnchange}
                  value={inputs.password}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <Eye /> : <EyeOff />}</span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Se le ha olvidado el password ?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 mt-4 mx-auto block w-full max-w-[150px] rounded-full hover:scale-110 transition-all"
            >
              {isLoading ? "Espere" : "Login"}
            </button>
          </form>
          <p className="my-5">
            No tienes cuenta aun ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

const initialValues = {
  email: "",
  password: "",
};

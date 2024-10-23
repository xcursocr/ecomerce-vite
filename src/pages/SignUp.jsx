import { Eye, EyeOff } from "lucide-react";
import gifLogin from "../assets/signin.gif"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../helpers";
import { apisignUp } from "../api/auth";
import { toast } from "react-toastify";


export function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [inputs, setInputs] = useState(initialValues)

  const navigate = useNavigate()


  const handleOnchange = (e) => {
    const { name, value } = e.target
    // console.log(name, value);
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const handleUploadOnChange = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageToBase64(file)
    setInputs((prev) => {
      return {
        ...prev,
        profilePic: imagePic
      }
    })
  }

  const hanleOnSubmit = async (e) => {
    // console.log(inputs);
    e.preventDefault()
    if (inputs.password != inputs.confirmPassword) return console.log("Los password son diferentes");
    setIsLoading(true)
    const results = await apisignUp(inputs)
    setIsLoading(false)
    if (results.success) {
      toast.success(results.message)
      navigate('/login')
    }
    if (results.error) {
      toast.error(results.message)
    }
  }

  // console.log(inputs);

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className=" bg-white p-5 w-full max-w-sm mx-auto">
          <div className="mx-auto w-20 h-20 relative overflow-hidden rounded-full">
            <div>
              <img src={inputs?.profilePic || gifLogin} alt="logo" />
            </div>
            <form>
              <label htmlFor="uploadFile">
                <input
                  type="file"
                  name="uploadFile"
                  id="uploadFile"
                  className="hidden"
                  onChange={handleUploadOnChange}
                />
                <div className="text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full">
                  Subir foto
                </div>
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={hanleOnSubmit}>
            <div>
              <label htmlFor="name">Nombre</label>
              <div className="bg-slate-100 p-2">
                <input type="text"
                  name="name"
                  id="name"
                  placeholder="Ingrese su nombre"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnchange}
                  value={inputs.name}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <div className="bg-slate-100 p-2">
                <input type="email"
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
                <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev) => !prev)}>
                  <span>
                    {
                      showPassword ? (<Eye />) : (<EyeOff />)
                    }
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirmar password</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirme su password"
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleOnchange}
                  value={inputs.confirmPassword}
                />
                <div className="cursor-pointer text-xl" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>
                    {
                      showConfirmPassword ? (<Eye />) : (<EyeOff />)
                    }
                  </span>
                </div>
              </div>
            </div>
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 mt-4 mx-auto block w-full max-w-[150px] rounded-full hover:scale-110 transition-all">
              {isLoading ? 'Espere' : "Crear cuenta"}
            </button>
          </form>
          <p className="my-5">Ya tienes cuenta ? <Link to={'/login'} className="text-red-600 hover:text-red-700 hover:underline">Iniciar Session</Link></p>
        </div>
      </div>
    </section>
  );
}


const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePic: ""
}
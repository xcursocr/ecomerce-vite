import { useEffect, useState } from "react";
import { apiGetUsers } from "../api/auth";
import { toast } from "react-toastify"
import moment from 'moment'
import { Pencil } from 'lucide-react'
import 'moment/locale/es' // Importa el locale en español
import { ChangeRol } from "../components/ChangeRol";
import { LoadingOvelShaped } from "../common";

// Establece el locale a español
moment.locale('es');


export function Allusers() {

  const [isLoading, setIsLoading] = useState(false)
  const [allUser, setAllUser] = useState({})
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [updateRolUser, setUpdateRolUser] = useState(
    {
      email: "",
      name: "",
      role: "",
      userId: ""
    }
  )

  const getAllUser = async () => {
    setIsLoading(true)
    const resp = await apiGetUsers()
    if (resp.success) {
      setIsLoading(false)
      setAllUser(resp.data)
    }
    if (resp.error) toast.error(resp.message)
  }

  useEffect(() => {
    getAllUser()
  }, []);

  if (isLoading) return <LoadingOvelShaped />

  return (
    <div className="bg-white p-4">
      <table className="w-full bg-white">
        <thead className="bg-black text-white">
          <tr>
            <th className="border text-base font-medium">Sr.</th>
            <th className="border text-base font-medium">Nombre</th>
            <th className="border text-base font-medium">Correo</th>
            <th className="border text-base font-medium">Rol</th>
            <th className="border text-base font-medium">Fecha de Creacion</th>
            <th className="border text-base font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {allUser && allUser.length > 0 ? (
            allUser.map((item, index) => (
              <tr key={index}>
                <td className="border text-base text-center">{index + 1}</td>
                <td className="border text-base text-center">{item.name}</td>
                <td className="border text-base text-center">{item.email}</td>
                <td className="border text-base text-center">{item.role}</td>
                <td className="border text-base text-center">{moment(item.createdAt).format('LL')}</td>
                <td className="border text-base text-center">
                  <button
                    className=" bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setOpenModalUpdate(true),
                        setUpdateRolUser(item)
                    }
                    }
                  >
                    <Pencil />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border text-base text-center">No se encontro nada por aqui 😮</td>
            </tr>
          )}
        </tbody>
      </table>

      {
        openModalUpdate &&
        <ChangeRol
          setOpenModalUpdate={() => setOpenModalUpdate(false)}
          name={updateRolUser.name}
          email={updateRolUser.email}
          role={updateRolUser.role}
          userId={updateRolUser.id}
          getAllUser={getAllUser}
        />
      }


    </div>
  );
}
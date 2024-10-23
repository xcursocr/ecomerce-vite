import { useState } from 'react';
import { ROLE } from '../helpers'
import { X } from 'lucide-react'
import { apiUpdateUser } from '../api/auth';
import { toast } from 'react-toastify';


export function ChangeRol({ name, email, role, userId, setOpenModalUpdate, getAllUser }) {

  const [userRole, setUserRole] = useState(role)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeSelect = (e) => {
    setUserRole(e.target.value)
  }

  const handleUpdateRol = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const resp = await apiUpdateUser({ userId: userId, role: userRole })
    // console.log(resp);
    if (resp.success) {
      setIsLoading(false)
      toast.success(resp.message)
      setOpenModalUpdate()
      getAllUser()
    }
    if (resp.error) toast.error(resp.message)

  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-35">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">

        <button className='w-full flex justify-end items-center' onClick={setOpenModalUpdate}>
          <X size={32} />
        </button>

        <header>
          <h1 className="text-lg font-medium">Cambiar Rol del Usuario</h1>
        </header>
        <div>
          <p className='text-sm font-light'>Nombre: {name}</p>
          <p className='text-sm font-light'>Correo: {email}</p>
          <div className='flex items-center justify-between'>
            <label>Role:</label>
            <select name="" id="" className=' border px-4 py-1' value={userRole} onChange={handleChangeSelect}>
              {
                Object.values(ROLE).map(item => {
                  return (
                    <option key={item} value={item}>{item}</option>
                  )
                })
              }
            </select>
          </div>
          <button className='mt-4 w-fit mx-auto block border p-1 px-3  bg-red-600 hover:bg-red-700 text-white' onClick={handleUpdateRol}>
            {
              isLoading ? "Espere" : "Actualizar Rol"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

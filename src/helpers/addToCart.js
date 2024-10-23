import { toast } from 'react-toastify'
import { apiAddCartProduct } from '../api/cart'

export const addToCart = async (e, id) => {
  e?.preventDefault()
  e?.stopPropagation()
  // console.log(id);


  const resp = await apiAddCartProduct(
    {
      productId: id
    }
  )

  // console.log(resp);

  if (resp.success) toast.success(resp.message)
  if (resp.error) toast.error(resp.message)

  return resp

}
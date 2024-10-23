import { useContext, useEffect, useState } from "react";
import Context from "../context";
import { Trash2 } from "lucide-react";
import { apiDeleteCartProduc, apiUpdateCartProduct, apiViewProductCart } from "../api/cart";
import { displayINRCurrency } from "../helpers/displayINRCurrency";

export function Cart() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(13).fill(null)

  const fetchData = async () => {
    const resp = await apiViewProductCart()
    // console.log(resp);
    if (resp.success) {
      setData(resp.data)
    }
  }

  const handleLoading = async () => {
    await fetchData()
  }

  useEffect(() => {
    setLoading(true)
    handleLoading()
    setLoading(false)
  }, [])


  const increaseQty = async (id, qty) => {
    const resp = await apiUpdateCartProduct(
      {
        id: id,
        quantity: qty + 1
      }
    )
    // console.log(resp);

    if (resp.success) {
      fetchData()
    }
  }

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const resp = await apiUpdateCartProduct(
        {
          id: id,
          quantity: qty - 1
        }
      )
      // console.log(resp);
      if (resp.success) {
        fetchData()
      }
    }
  }


  const deleteCartProduct = async (id) => {
    const resp = await apiDeleteCartProduc({
      id: id
    })
    // console.log(resp);
    if (resp.success) {
      fetchData()
      context.getCartCount()
    }
  }



  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
  const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.product?.productSelling), 0)

  return (
    <div className='container mx-auto'>

      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <p className='bg-white py-5'>El carrito esta vacio</p>
          )
        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/***view product */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                  </div>
                )
              })

            ) : (
              data.map((item, index) => {
                return (
                  <div
                    key={item?.id + "Add To Cart Loading" + index}
                    className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img
                        src={item?.product?.productImage[0]}
                        className='w-full h-full object-scale-down mix-blend-multiply' />
                    </div>
                    <div className='px-4 py-2 relative'>
                      {/**delete product */}
                      <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'
                        onClick={() => deleteCartProduct(item?.id)}
                      >
                        <Trash2 />
                      </div>

                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                        {item?.productId?.productName}
                      </h2>
                      <p className='capitalize text-slate-500'>
                        {item?.productId.category}
                      </p>
                      <div className='flex items-center justify-between'>
                        <p className='text-red-600 font-medium text-lg'>
                          {displayINRCurrency(item?.product?.productSelling)}
                        </p>
                        <p className='text-slate-600 font-semibold text-lg me-4 md:me-7'>
                          {displayINRCurrency(item?.product?.productSelling * item?.quantity)}
                        </p>
                      </div>
                      <div className='flex items-center gap-3 mt-1'>
                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '
                          onClick={() => decraseQty(item?.id, item?.quantity)}
                        >-</button>
                        <span>{item?.quantity}</span>
                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '
                          onClick={() => increaseQty(item?.id, item?.quantity)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>


        {/***summary  */}
        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

              </div>
            ) : (
              <div className='h-36 bg-white'>
                <h2 className='text-white bg-red-600 px-4 py-1'>Resumen</h2>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Cantidad</p>
                  <p>{totalQty}</p>
                </div>

                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                  <p>Precio total</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button className='bg-blue-600 p-2 text-white w-full mt-2'>Pago</button>

              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
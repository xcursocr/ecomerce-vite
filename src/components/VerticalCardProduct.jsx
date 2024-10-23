import { useContext, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'
import { apiCategoryWiseProduct } from "../api/products";
import { addToCart, displayINRCurrency } from "../helpers";
import { ChevronFirst, ChevronLast } from "lucide-react";
import Context from "../context";

export function VerticalCardProduct({ category, heading }) {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  // cart
  const { getCartCount } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    getCartCount()
  }

  const getCategoriesWise = async () => {
    setIsLoading(true)
    const resp = await apiCategoryWiseProduct(category)
    setIsLoading(false)
    // console.log(resp);

    setData(resp?.data)
  }

  useEffect(() => {
    getCategoriesWise()
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300
  }


  return (
    <div className='container mx-auto px-4 my-6 relative'>

      <h2 className='text-2xl font-semibold py-4'>
        {heading}
      </h2>


      <div
        className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all'
        ref={scrollElement}
      >

        <button
          className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'
          onClick={scrollLeft}
        >
          <ChevronFirst />
        </button>
        <button
          className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'
          onClick={scrollRight}
        >
          <ChevronLast />
        </button>

        {isLoading ? (
          loadingList && loadingList.length > 0 ? (
            loadingList.map((product, index) => {
              return (
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow' key={index}>
                  <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] animate-pulse'></div>
                  <div className='p-4 grid gap-3 w-full'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full flex justify-center items-center'></p>
                    <div className='flex gap-3 w-full'>
                      <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                      <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    </div>
                    <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No hay productos cargando.</p> // Mensaje para cuando loadingList está vacío
          )
        ) : (
          data && data.length > 0 ? (
            data.map((product, index) => {
              return (
                <Link to={"product/" + product?.id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow ' key={index}>
                  <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                  </div>
                  <div className='p-4 grid gap-3'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                      {product?.productName}
                    </h2>
                    <p className='capitalize text-slate-500'>
                      {product?.productCategory}
                    </p>
                    <div className='flex gap-3'>
                      <p className='text-red-600 font-medium'>
                        {displayINRCurrency(product?.productSelling)}
                      </p>
                      <p className='text-slate-500 line-through'>
                        {displayINRCurrency(product?.productPrice)}
                      </p>
                    </div>
                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                      onClick={(e) => handleAddToCart(e, product?.id)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No hay productos disponibles.</p> // Mensaje para cuando data está vacío
          )
        )}

      </div>


    </div>
  );
}
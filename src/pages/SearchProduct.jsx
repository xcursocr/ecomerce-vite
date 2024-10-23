import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiSearchProduct } from "../api/products";
import { VerticalCard } from "../components/VerticalCard";

export function SearchProduct() {

  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // console.log("query", query.search)

  const getSearch = async () => {
    const resp = await apiSearchProduct(query.search)
    // console.log(resp);
    setLoading(false)
    setData(resp.data)
  }

  useEffect(() => {
    getSearch()
  }, [query]);

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Cargando ...</p>
        )
      }

      <p className='text-lg font-semibold my-3'>Resultado de la busqueda : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No se encontraron productos....</p>
        )
      }


      {
        data.length !== 0 && !loading && (
          <VerticalCard loading={loading} data={data} />
        )
      }

    </div>
  );
}
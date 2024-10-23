import { useEffect, useState } from "react";
import { NewProduct } from "../components/NewProduct";
import { apiGetProducts } from "../api/products";
import { LoadingOvelShaped } from "../common";
import { AdminProductCard } from "../components";

export function AllProducts() {
  const [openModalNewProduct, setOpenModalNewProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    setIsLoading(true);
    const resp = await apiGetProducts();
    setIsLoading(false);
    setAllProducts(resp?.data || []);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading) return <LoadingOvelShaped />;

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Todos los producto</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenModalNewProduct(true)}
        >
          Nuevo Producto
        </button>
      </div>

      {/**all product */}
      {/* h-[calc(100vh-190px)] */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)]  overflow-y-scroll">
        {allProducts.map((product, index) => {
          return (
            <AdminProductCard
              product={product}
              key={index + "allProduct"}
              getAllProducts={getAllProducts}
            />
          );
        })}
      </div>

      {/* New product */}
      {openModalNewProduct && (
        <NewProduct
          setOpenModalNewProduct={() => setOpenModalNewProduct(false)}
          getAllProducts={getAllProducts}
        />
      )}
    </div>
  );
}

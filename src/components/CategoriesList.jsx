import { useEffect, useState } from "react";
import { apiGetProductCategories } from "../api/products";
import { Link } from "react-router-dom";

export function CategoriesList() {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const categoryLoading = new Array(7).fill(null);

  const getCategoriesProduct = async () => {
    setIsLoading(true);
    const resp = await apiGetProductCategories();
    setIsLoading(false);
    setCategoryProduct(resp.data);
  };

  useEffect(() => {
    getCategoriesProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {isLoading
          ? categoryLoading.map((el, index) => {
            return (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            );
          })
          : categoryProduct.map((product, index) => {
            return (
              <Link
                to={"/product-category?category=" + product?.productCategory}
                className="cursor-pointer"
                key={product?.productCategory}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productCategory}
                    className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product?.productCategory}
                </p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

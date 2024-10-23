import { Pencil } from "lucide-react";
import { EditProduct } from "./EditProduct";
import { useState } from "react";
import { displayINRCurrency } from "../helpers";

export const AdminProductCard = ({ product, getAllProducts }) => {
  const [editProduct, setEditProduct] = useState();

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={product?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{product?.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(product?.productSelling)}
          </p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <Pencil />
          </div>
        </div>
      </div>

      {editProduct && (
        <EditProduct
          product={product}
          setEditProduct={() => setEditProduct(false)}
          getAllProducts={getAllProducts}
        />
      )}
    </div>
  );
};

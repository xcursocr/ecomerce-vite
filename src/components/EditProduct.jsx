import { ArrCategories, uploadImageCloudinary } from "../helpers";
import { LoadingDots } from "../common/Loading";
import { DisplayImage } from "./DisplayImage";
import { useState } from "react";
import { CloudUpload, Trash2, X } from "lucide-react";
import { apiUpdateProduct } from "../api/products";
import { toast } from "react-toastify";


// categories
// const ArrCategories = [
//   { id: 1, label: "Colgantes", value: "colgantes" },
//   { id: 2, label: "Plataformas", value: "plataformas" },
//   { id: 3, label: "Ganaderas", value: "ganaderas" },
//   { id: 4, label: "Camioneras", value: "camioneras" },
//   { id: 5, label: "Balanzas", value: "balanzas" },
// ];

export function EditProduct({ product, setEditProduct, getAllProducts }) {

  const [isLoading, setIsLoading] = useState(false);

  const [formInputs, setFormInputs] = useState({
    ...product,
    productName: product?.productName,
    productBrand: product?.productBrand,
    productCategory: product?.productCategory,
    productImage: product?.productImage || [],
    productDescripcion: product?.productDescripcion,
    productPrice: product?.productPrice,
    productSelling: product?.productSelling,
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [urlImgFullScreen, setUrlImgFullScreen] = useState("");

  const handleOnChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormInputs((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const resp = await apiUpdateProduct(formInputs);
    if (resp?.success) {
      setIsLoading(false)
      getAllProducts()
      toast.success(resp?.message);
      setEditProduct();
    }
    if (resp.error) toast.error(resp.message);
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setIsLoading(true);
    const imgeUpload = await uploadImageCloudinary(file);
    setIsLoading(false);

    setFormInputs((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, imgeUpload.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("image index", index);

    const newProductImage = [...formInputs.productImage];
    newProductImage.splice(index, 1);

    setFormInputs((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };


  return (
    <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Editar producto</h2>
          <div
            className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'
            onClick={setEditProduct}>
            <X />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Nombre del producto :</label>
          <input
            type="text"
            id="productName"
            placeholder="p. ej. Bascula industrial"
            name="productName"
            value={formInputs.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="productBrand" className="mt-3">
            Marca :
          </label>
          <input
            type="text"
            id="productBrand"
            placeholder="p. ej. Cardinal"
            value={formInputs.productBrand}
            name="productBrand"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="productCategory" className="mt-3">
            Categoria :
          </label>
          <select
            required
            value={formInputs.productCategory}
            name="productCategory"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Seleccione la categoria</option>
            {ArrCategories.map((item, i) => {
              return (
                <option value={item.value} key={item.value + i}>
                  {item.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Imagen del producto :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              {isLoading ? (
                <LoadingDots />
              ) : (
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <CloudUpload />
                  </span>
                  <p className="text-sm">Subir imagen</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="hidden"
                    onChange={handleUploadProduct}
                  />
                </div>
              )}
            </div>
          </label>
          <div>
            {formInputs?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {formInputs.productImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setUrlImgFullScreen(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <Trash2 />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *La imagen del producto es requerido
              </p>
            )}
          </div>

          <label htmlFor="productPrice" className="mt-3">
            Precio :
          </label>
          <input
            type="number"
            id="productPrice"
            placeholder="p. ej. 55.80"
            value={formInputs.productPrice}
            name="productPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="productSelling" className="mt-3">
            Precio de venta :
          </label>
          <input
            type="number"
            id="productSelling"
            placeholder="p. ej. 84.50"
            value={formInputs.productSelling}
            name="productSelling"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="productDescripcion" className="mt-3">
            Descripcion :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="p. ej. Equipo industrial de pesaje"
            rows={3}
            onChange={handleOnChange}
            name="productDescripcion"
            value={formInputs.productDescripcion}
          ></textarea>

          <button className={`px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700`}>
            {
              isLoading ? "Espere" : "Actualizar producto"
            }
          </button>
        </form>




      </div>




      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          setOpenFullScreenImage={() => setOpenFullScreenImage(false)}
          urlImgFullScreen={urlImgFullScreen}
        />
      )}


    </div>
  );
}
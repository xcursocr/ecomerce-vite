import { CokkieAcept } from "../common";
import { BannerProduct, CategoriesList, HorizontalCardProduct, VerticalCardProduct } from "../components/";


export function Home() {
  return (
    <div>
      <CategoriesList />
      <BannerProduct />
      <HorizontalCardProduct category={'colgantes'} heading={"Ofertas balanzas colgantes"} />
      <HorizontalCardProduct category={'plataformas'} heading={"Ofertas balanzas Plataformas"} />
      {/* mobile */}
      <VerticalCardProduct category={'colgantes'} heading={"Ofertas balanzas Colgantes Mobile"} />
      <VerticalCardProduct category={'camioneras'} heading={"Ofertas balanzas Camioneras Mobile"} />
      <CokkieAcept />
    </div>
  );
}

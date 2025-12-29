import CarouselImages from "./session/CarouselImage";
import AboutUs from "./session/AboutUs";
import CustomBlend from "./session/CustomBlend";
import OurProducts from "./session/OurProducts";
import AddressBox from "../checkout/AddressBox";

export default function HomeContainer() {
  return (
    <>
      <CarouselImages />
      <AboutUs />
      <CustomBlend />
      <OurProducts />
      <AddressBox />
    </>
  );
}

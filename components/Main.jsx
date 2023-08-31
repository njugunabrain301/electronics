import Slider from "./Slider";
import NavigateButtons from "./NavigateButtons";
import ProductSection from "./ProductSection/ProductSection";

const Main = ({ products, slider, promoted, profile, categories }) => {
  return (
    <div className="">
      <Slider products={products} slider={slider}></Slider>
      <NavigateButtons
        profile={profile}
        categories={categories}
      ></NavigateButtons>
      <ProductSection products={promoted}></ProductSection>
    </div>
  );
};

export default Main;

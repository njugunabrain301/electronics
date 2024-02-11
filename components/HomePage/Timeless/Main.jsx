import Slider from "./Slider";
import NavigateButtons from "../../NavigateButtons/NavigateButtons";
import ProductSection from "./ProductSection/ProductSection";

const Main = ({ products, slider, promoted, profile, categories }) => {
  const template = "new"; //profile.template
  return (
    <div>
      <Slider products={products} slider={slider}></Slider>
      <div id="more">
        <NavigateButtons
          profile={profile}
          categories={categories}
        ></NavigateButtons>
      </div>
      <ProductSection
        products={promoted}
        showPrice={profile.showPrice}
      ></ProductSection>
      <div id="more-categories">
        <NavigateButtons
          profile={profile}
          categories={categories}
          minified={true}
        ></NavigateButtons>
      </div>
    </div>
  );
};

export default Main;

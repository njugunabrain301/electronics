import NavigateButtons from "@/components/NavigateButtons/NavigateButtons";
import Slider from "../Slider";
import ProductSection from "../ProductSection";

const MainContent = ({ products, slider, promoted, profile, categories }) => {
  return (
    <main-content>
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
        profile={profile}
      ></ProductSection>
      <div id="more-categories">
        <NavigateButtons
          profile={profile}
          categories={categories}
          minified={true}
        ></NavigateButtons>
      </div>
    </main-content>
  );
};

export default MainContent;

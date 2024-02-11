import Slider from "./Slider";
import NavigateButtons from "../../NavigateButtons/NavigateButtons";
import ProductSection from "./ProductSection/ProductSection";
import ProductCarousel from "./ProductCarousel";
import Tags from "./Tags";

const Main = ({ products, slider, promoted, profile, categories }) => {
  let video = "";
  let tags = [];

  if (profile.promotions) {
    let vids = [];
    profile.promotions.map((p) => {
      if (p.type === "tag") tags.push(p.content);
      else if (p.type === "video") vids.push(p.content);
      return p;
    });
    if (vids.length > 0) video = vids[0];
  }

  return (
    <div>
      <Slider
        products={products}
        slider={slider}
        categories={categories}
      ></Slider>

      <ProductCarousel
        products={promoted}
        showPrice={profile.showPrice}
        title={"Trending Products"}
      ></ProductCarousel>

      <Tags profile={profile} />

      <ProductSection
        products={products}
        showPrice={profile.showPrice}
      ></ProductSection>
      <div id="more-categories">
        <NavigateButtons
          profile={profile}
          categories={categories}
          minified={false}
        ></NavigateButtons>
      </div>
    </div>
  );
};

export default Main;

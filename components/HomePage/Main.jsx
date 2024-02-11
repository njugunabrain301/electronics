import Timeless from "./Timeless/Main";
import Opulence from "./Opulence/Main";

const Main = ({ products, slider, promoted, profile, categories }) => {
  const template = profile.template;
  return (
    <div>
      {template === "Timeless" && (
        <Timeless
          products={products}
          slider={slider}
          promoted={promoted}
          profile={profile}
          categories={categories}
        />
      )}
      {template === "new" && (
        <Opulence
          products={products}
          slider={slider}
          promoted={promoted}
          profile={profile}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Main;

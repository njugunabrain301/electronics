import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const FilteredProducts = ({
  productList,
  type,
  wearables,
  profile,
  searchParam,
}) => {
  const template = profile.template;

  return (
    <>
      {template === "Opulence" && (
        <Opulence
          productList={productList}
          type={type}
          wearables={wearables}
          searchParam={searchParam}
          profile={profile}
          template={template}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          productList={productList}
          type={type}
          wearables={wearables}
          searchParam={searchParam}
          profile={profile}
          template={template}
        />
      )}
    </>
  );
};

export default FilteredProducts;

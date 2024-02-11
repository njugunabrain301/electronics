import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const SingleProduct = ({ product, profile, others, categories }) => {
  let template = profile.template;
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          product={product}
          profile={profile}
          others={others}
          categories={categories}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          product={product}
          others={others}
          categories={categories}
          profile={profile}
        />
      )}
    </>
  );
};

export default SingleProduct;

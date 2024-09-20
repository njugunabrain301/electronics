import MainContent from "./Content/Main";

const Main = ({ products, slider, promoted, profile, categories }) => {
  return (
    <MainContent
      products={products}
      slider={slider}
      promoted={promoted}
      profile={profile}
      categories={categories}
    />
  );
};

export default Main;

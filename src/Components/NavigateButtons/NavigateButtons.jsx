import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import {
  fetchCategories,
  filterProducts,
} from "../../features/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavigateButtons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

  let promotions = []; //["UP TO 20% OFF", "Steel Cooking Set 30%"];

  return (
    <div>
      <div className="flex items-center justify-center py-8 flex-wrap">
        {categories.map((button, index) => {
          return (
            <div key={index} className="mx-2 mb-3">
              <Link to={"/filteredProducts/" + button}>
                <Button
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out"
                  onClick={() => dispatch(filterProducts(button))}
                >
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      {promotions.map((item, index) => (
        <div
          className="bg-black p-2 w-[60%] my-3 mx-auto rounded-md"
          key={index}
        >
          <h3 className="text-white text-center text-lg font-inter font-bold tracking-normal leading-none">
            {item}
          </h3>
        </div>
      ))}

      {/* <div className="flex justify-center item-center py-4">
        <img
          className="w-[70%] rounded-md shadow-lg shadow-gray-600"
          src={clothes}
          alt="clothes"
        ></img>
      </div> */}
    </div>
  );
};

export default NavigateButtons;

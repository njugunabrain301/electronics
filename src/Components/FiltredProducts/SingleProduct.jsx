import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "@material-tailwind/react";
import { addToCart } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  loadSingleProduct,
} from "../../features/slices/productsSlice";
import { Helmet } from "react-helmet";

const SingleProduct = ({ handleAuth }) => {
  const products = useSelector((state) => state.products.filteredProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const product = useSelector((state) => state.products.singleProduct);

  const productSize = product ? (product.size ? product.size[0] : "-") : "-";
  const productColor = product ? (product.color ? product.color[0] : "-") : "-";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);
  const authUser = useSelector((state) => state.user.authUser);

  const { id } = useParams();
  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.description.slice(0, 100)} />
        <meta name="keywords" content={product.name + " " + product.type} />
      </Helmet>
      {product && (
        <div className="flex justify-center items-center p-4 pb-8 flex-wrap">
          <div className="flex justify-center  align-center m-4">
            <img
              className="min-h-300px max-h-700px rounded-lg max-w-[400px] w-full"
              src={product.img}
              alt={product.name}
            ></img>
          </div>
          <div className="">
            <div className="max-w-lg">
              <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
                {product.name}
              </h5>
              {product.offer && (
                <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
                  {product.offer}% OFF
                </p>
              )}
              <p className="text-gray-600 text-l font-inter tracking-normal leading-none pb-4">
                {product.description}
              </p>
              <div className="pb-4">
                {product.size ? (
                  <div>
                    <label
                      htmlFor="size"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pick a size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {product.size.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="pb-4">
                {product.color && (
                  <div>
                    <label
                      htmlFor="color"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pick a color
                    </label>
                    <select
                      id="color"
                      name="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {product.color.map((color, index) => {
                        return (
                          <option key={index} value={color}>
                            {color}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
              <Tooltip content="Add to Cart" placement="bottom">
                <Button
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  onClick={() =>
                    authUser
                      ? dispatch(
                          addToCart({
                            _id: product._id,
                            name: product.name,
                            img: product.img,
                            text: product.description,
                            size: size,
                            color: color,
                            price: product.price,
                            amount: 1,
                            totalPrice: product.price,
                          })
                        )
                      : handleAuth()
                  }
                >
                  Add to Cart
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;

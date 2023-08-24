import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Tooltip,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { addToCart } from "../../features/slices/cartSlice";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  loadSingleProduct,
} from "../../features/slices/productsSlice";
import { Helmet } from "react-helmet";
import { colorComponent } from "../Utils/Utils";

const SingleProduct = ({ handleAuth }) => {
  const products = useSelector((state) => state.products.filteredProducts);
  const showPrice = useSelector((state) => state.app.profile.showPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [products, dispatch]);

  const product = useSelector((state) => state.products.singleProduct);
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    setColor(
      product
        ? product.colors && product.colors.length > 0
          ? product.colors[0]
          : "-"
        : "-"
    );
    setSize(
      product
        ? product.sizes && product.sizes.length > 0
          ? product.sizes[0]
          : "-"
        : "-"
    );
    setSelectedImage(product.img);
  }, [product]);

  const productSize = product
    ? product.sizes && product.sizes.length > 0
      ? product.sizes[0]
      : "-"
    : "-";

  const productColor = product
    ? product.colors && product.colors.length > 0
      ? product.colors[0]
      : "-"
    : "-";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);
  const authUser = useSelector((state) => state.user.authUser);

  const { id } = useParams();
  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  const theme = useSelector((state) => state.app.theme);
  useEffect(() => {
    colorComponent("my-select");
  });
  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-1200/"
    );
    return img;
  };
  return (
    <div className="bg-skin-primary text-skin-base">
      <Helmet>
        <title>{product.name}</title>
        <meta
          name="description"
          content={
            product && product.description
              ? product.description.slice(0, 100)
              : ""
          }
        />
        <meta name="keywords" content={product.name + " " + product.type} />
      </Helmet>
      {product && (
        <div className="flex justify-center items-center p-4 pb-8 flex-wrap">
          <div className="flex justify-center align-center m-4 flex-col">
            <img
              className="min-h-300px max-h-700px rounded-lg max-w-[400px] w-full"
              src={resizeCardImage(selectedImage)}
              alt={product.name}
            ></img>
            <div className="w-full flex items-center p-2">
              <div
                className="w-[120px] max-w-[20%] ml-2"
                style={{ aspectRatio: "3/2" }}
              >
                <img
                  src={product.img}
                  style={{ width: "100%", aspectRatio: "3/2" }}
                  className="rounded-md cursor-pointer"
                  onClick={() => setSelectedImage(product.img)}
                />
              </div>
              {product &&
                product.images &&
                product.images.map((im, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[120px] max-w-[20%] ml-2"
                      style={{ aspectRatio: "3/2" }}
                    >
                      <img
                        src={im.img}
                        style={{ width: "100%", aspectRatio: "3/2" }}
                        className="rounded-md cursor-pointer"
                        onClick={() => setSelectedImage(im.img)}
                      />
                    </div>
                  );
                })}
            </div>
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
              <p className="text-l font-inter tracking-normal leading-none pb-4">
                {product.description}
              </p>
              <div className="pb-4">
                {product.sizes && product.sizes.length > 0 ? (
                  <div>
                    <Select
                      id="size"
                      name="size"
                      label="Pick a size"
                      value={size}
                      disabled={productSize === "-"}
                      onChange={(e) => setSize(e)}
                      color={theme["button-base"]}
                      className="my-select bg-skin-primary text-skin-base text-sm rounded-lg block w-full p-2.5"
                    >
                      {product.sizes.map((item, index) => {
                        return (
                          <Option key={index} value={item}>
                            {item}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="pb-4">
                {product.colors && (
                  <div>
                    <Select
                      id="color"
                      name="color"
                      label="Pick a color"
                      disabled={productColor === "-"}
                      onChange={(e) => {
                        setColor(e);
                      }}
                      value={color}
                      color={theme["button-base"]}
                      className="my-select bg-skin-primary text-skin-base text-sm rounded-lg block w-full p-2.5"
                    >
                      {product.colors.map((color, index) => {
                        return (
                          <Option
                            selected={true}
                            key={index}
                            value={color}
                            className="flex align-center"
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: "30px",
                                height: "20px",
                                backgroundColor: color,
                                borderRadius: "3px",
                              }}
                            ></span>
                            <span>
                              &nbsp;
                              {color}
                            </span>
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
              </div>
              {showPrice && (
                <Typography className="font-bold text-skin-base">
                  Ksh.&nbsp;{product.price}
                </Typography>
              )}
              <Tooltip content="Add to Cart" placement="bottom">
                <Button
                  className="bg-skin-alt text-skin-inverted"
                  size="lg"
                  color={theme["text-highlight"]}
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

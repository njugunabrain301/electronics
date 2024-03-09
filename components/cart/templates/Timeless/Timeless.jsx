"use client";
import React, { useState } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import Checkout from "./CheckOut";
import { removeFromCart } from "@/utils/frontendAPIs/cart";
import Image from "next/image";
import { useGlobalContext } from "@/Context/context";
import { Button } from "@mui/material";

const Timeless = ({
  closeModal,
  showPrice,
  totalPrice,
  cart,
  setCart,
  checkoutInfo,
  single,
}) => {
  const [openCheckout, setOpenCheckout] = useState(false);

  const { theme, removeFromLocalCart } = useGlobalContext();
  const [removing, setRemoving] = useState("");

  let removeItemFromCart = async (item) => {
    setRemoving(item._id);
    gtag("event", "remove_from_cart", {
      currency: "KES",
      value: item.price,
      items: [
        {
          item_id: item._id,
          item_name: item.name,
          affiliation: "",
          coupon: "",
          discount: 0,
          index: 0,
          item_brand: item.brand,
          item_category: "",
          item_category2: "",
          item_variant:
            item.color + " " + item.size + " " + item.selectedOption,
          price: item.price,
          quantity: 1,
        },
      ],
    });
    if (localStorage.getItem("user")) {
      let res = await removeFromCart(item);
      if (res.success) {
        setCart(res.data);
        localStorage.setItem("cart", JSON.stringify(res.data));
      }
    } else {
      removeFromLocalCart(item);
    }

    setRemoving("");
  };

  let initiateCheckout = () => {
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "initiate-checkout",
      totalPrice,
    };
    dataLayer.push(event);
    gtag("event", "begin_checkout", {
      currency: "KES",
      value: totalPrice,
      coupon: "",
      items: cart.map((item, idx) => {
        return {
          item_id: item._id,
          item_name: item.name,
          affiliation: "",
          coupon: "",
          discount: 0,
          index: idx,
          item_brand: item.brand,
          item_category: "",
          item_category2: "",
          item_variant:
            item.color + " " + item.size + " " + item.selectedOption,
          price: item.price,
          quantity: item.amount,
        };
      }),
    });
    setOpenCheckout(true);
  };

  function removeTags(str) {
    if (!str || str === null || str === "") return "";
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const resizeProdImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-500/"
    );
    return img;
  };

  return (
    <div className="flex justify-center items-center">
      {!openCheckout ? (
        <div className="min-w-[330px]">
          {cart.length > 0 ? (
            <div
              className="rounded-md border-0 outline-0"
              style={{
                backgroundColor: theme.palette.background.primary,
                color: theme.palette.text.base,
              }}
            >
              <DialogHeader
                className="flex justify-between"
                style={{
                  color: theme.palette.text.base,
                }}
              >
                Shopping Cart
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </DialogHeader>
              <DialogBody
                divider
                className="flex flex-col justify-center items-start px-[0]"
                style={{
                  color: theme.palette.text.base,
                  borderColor: theme.palette["flat-button"].main,
                }}
              >
                <div className="max-h-[400px] overflow-y-auto p-4">
                  {cart.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="grid grid-cols-2 py-4">
                          <div>
                            <Image
                              className="h-[125px] rounded-md"
                              src={resizeProdImage(item.img)}
                              alt={item.name}
                              width={150}
                              height={100}
                            />
                            <div className="flex flex-col items-start">
                              <h4
                                className="text-base font-inter font-bold tracking-normal leading-none pt-2"
                                style={{
                                  color: theme.palette.text.base,
                                }}
                              >
                                {item.name}
                              </h4>
                            </div>
                          </div>
                          <div className="ml-[8px]">
                            {item.size.trim() !== "-" && (
                              <p className="text-sm font-inter tracking-normal leading-none pt-2">
                                Size: <span className="ml-2">{item.size}</span>
                              </p>
                            )}
                            {item.color.trim() !== "-" && (
                              <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                                Color:{item.color === "-" ? " -" : " "}
                                <span
                                  className="ml-2 rounded-full px-2"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                              </p>
                            )}
                            {item.selectedOption && (
                              <p className="text-sm font-inter tracking-normal leading-none pt-2">
                                Option:{" "}
                                <span className="ml-2">
                                  {item.selectedOption}
                                </span>
                              </p>
                            )}
                            <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                              Amount:{" "}
                              <span className="ml-2">{item.amount}</span>
                            </p>
                            {showPrice && (
                              <>
                                <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                                  Price:{" "}
                                  <span className="">
                                    Ksh.&nbsp;{item.price}
                                  </span>
                                </p>
                                <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                                  Total{" "}
                                  <span className="hidden md-block">Price</span>
                                  :{" "}
                                  <span className="">
                                    Ksh.&nbsp;{item.price * item.amount}
                                  </span>
                                </p>
                              </>
                            )}
                            <div className="pt-4">
                              {!single && (
                                <Tooltip
                                  content="Remove from the Cart"
                                  placement="bottom"
                                >
                                  <Button
                                    color={"error"}
                                    variant="contained"
                                    size="small"
                                    className={"mr-4 "}
                                    onClick={() => removeItemFromCart(item)}
                                  >
                                    {removing === item._id ? "..." : "Remove"}
                                  </Button>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="text-xs font-inter tracking-normal leading-none pt-2">
                            {removeTags(item.description).slice(0, 100) + "..."}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogBody>
              <DialogFooter
                className="flex justify-between items-center"
                style={{
                  color: theme.palette.text.base,
                }}
              >
                {showPrice ? (
                  <p className="text-base font-inter tracking-normal leading-none pt-2">
                    Total Price: <span className="">Ksh. {totalPrice}</span>
                  </p>
                ) : (
                  <div></div>
                )}
                <Button
                  color={"success"}
                  onClick={initiateCheckout}
                  variant="contained"
                >
                  {showPrice ? "Check Out" : "Get Quote"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div
              className="rounded-md border-0 outline-0"
              style={{
                backgroundColor: theme.palette.background.primary,
                color: theme.palette.text.base,
              }}
            >
              <DialogHeader
                className="flex justify-between"
                style={{ color: theme.palette.text.base }}
              >
                Shopping Cart
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  aria-label="Close"
                  onClick={() => closeModal()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </DialogHeader>
              <DialogBody
                divider
                style={{ borderColor: theme.palette["flat-button"].main }}
              >
                <div className="" style={{ color: theme.palette.text.base }}>
                  <h1 className="text-3xl font-inter font-bold tracking-normal leading-none py-4">
                    Your bag is empty
                  </h1>
                  <p className="text-base font-inter tracking-normal leading-none ">
                    Add some products
                  </p>
                </div>
              </DialogBody>
              <DialogFooter>
                <div></div>
              </DialogFooter>
            </div>
          )}
        </div>
      ) : (
        <>
          <Checkout
            closeModal={closeModal}
            setOpenCheckout={setOpenCheckout}
            checkoutInfo={checkoutInfo}
            showPrice={showPrice}
            totalPrice={totalPrice}
            cart={cart}
            single={single}
          />
        </>
      )}
    </div>
  );
};

export default Timeless;

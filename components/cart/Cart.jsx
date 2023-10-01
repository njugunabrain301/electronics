"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import Checkout from "./CheckOut";
import { removeFromCart } from "@/utils/frontendAPIs/cart";
import { Themes } from "@/utils/Themes/Themes";
import Image from "next/image";

const Cart = ({
  closeModal,
  showPrice,
  totalPrice,
  cart,
  setCart,
  checkoutInfo,
  selectedTheme,
}) => {
  const [openCheckout, setOpenCheckout] = useState(false);

  const theme = Themes[selectedTheme];
  const [removing, setRemoving] = useState("");

  let removeItemFromCart = async (item) => {
    setRemoving(item._id);
    let res = await removeFromCart(item);
    if (res.success) {
      setCart(res.data);
      localStorage.setItem("cart", JSON.stringify(res.data));
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
    setOpenCheckout(true);
  };

  return (
    <div className="flex justify-center items-center">
      {!openCheckout ? (
        <div className="min-w-[330px]">
          {cart.length > 0 ? (
            <div className="rounded-md border-0 outline-0 bg-skin-primary text-skin-base">
              <DialogHeader className="flex justify-between text-skin-primary">
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
              >
                <div className="max-h-[400px] overflow-y-auto p-4">
                  {cart.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="grid grid-cols-2 py-4">
                          <div>
                            <Image
                              className="h-[125px] rounded-md"
                              src={item.img}
                              alt={item.name}
                              width={150}
                              height={100}
                            />
                            <div className="flex flex-col items-start text-skin-base">
                              <h4 className=" text-base font-inter font-bold tracking-normal leading-none pt-2">
                                {item.name}
                              </h4>
                            </div>
                          </div>
                          <div className="ml-[8px] text-skin-base">
                            <p className="text-sm font-inter tracking-normal leading-none pt-2">
                              Selected size:{" "}
                              <span className="ml-2">{item.size}</span>
                            </p>
                            <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                              Selected color:{item.color === "-" ? " -" : " "}
                              <span
                                className="ml-2 rounded-full px-2"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </p>
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
                                    Ksh.&nbsp;{item.totalPrice}
                                  </span>
                                </p>
                              </>
                            )}
                            <div className="pt-4">
                              <Tooltip
                                content="Remove from the Cart"
                                placement="bottom"
                              >
                                <Button
                                  onClick={() => removeItemFromCart(item)}
                                  size="sm"
                                  // color={theme["button-delete"]}
                                  ripple={true}
                                  variant="filled"
                                  className="bg-skin-button-delete"
                                >
                                  {removing === item._id ? "..." : "Remove"}
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className="max-w-xs text-skin-base">
                          <p className="text-xs font-inter tracking-normal leading-none pt-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogBody>
              <DialogFooter className="flex justify-between items-center">
                {showPrice ? (
                  <p className="text-skin-base text-base font-inter tracking-normal leading-none pt-2">
                    Total Price: <span className="">Ksh. {totalPrice}</span>
                  </p>
                ) : (
                  <div></div>
                )}
                <Button
                  color={theme["button-success"]}
                  onClick={initiateCheckout}
                  variant="filled"
                >
                  {showPrice ? "Check Out" : "Get Quote"}
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="rounded-md border-0 outline-0 bg-skin-primary text-skin-base">
              <DialogHeader className="flex justify-between text-skin-base">
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
              <DialogBody divider>
                <div className="text-skin-base">
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
            selectedTheme={selectedTheme}
          />
        </>
      )}
    </div>
  );
};

export default Cart;

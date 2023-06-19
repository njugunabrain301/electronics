import React, { useState } from "react";
import {
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../features/slices/cartSlice";
import MyModal from "../MyModal/MyModal";
import Checkout from "./CheckOut";

const Cart = ({ closeModal }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const [openCheckout, setOpenCheckout] = useState(false);

  const dispatch = useDispatch();
  return (
    <div>
      {!openCheckout ? (
        <div>
          {cart.length > 0 ? (
            <div className="w-full h-screen flex justify-center items-center p-[20px]">
              <div className="bg-white rounded-md border-0 outline-0 mt-[150px]">
                <DialogHeader className="flex justify-between">
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
                  className="flex flex-col justify-center items-start"
                >
                  {cart.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="grid grid-cols-2 py-4">
                          <div>
                            <img
                              className="h-[125px] rounded-md"
                              src={item.img}
                              alt={item.name}
                            ></img>
                            <div className="flex flex-col items-start">
                              <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                                {item.name}
                              </h4>
                            </div>
                            <div className="max-w-xs">
                              <p className="text-black text-xs font-inter tracking-normal leading-none pt-2">
                                {item.text}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                              Selected size:{" "}
                              <span className="ml-2">{item.size}</span>
                            </p>
                            <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                              Selected color:{" "}
                              <span
                                className="ml-2 rounded-full px-2"
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </p>
                            <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                              Amount:{" "}
                              <span className="ml-2">{item.amount}</span>
                            </p>
                            <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                              Single Item Price:{" Ksh."}
                              <span className="ml-2">{item.price}</span>
                            </p>
                            <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                              Total Item Prices:{" Ksh."}
                              <span className="ml-2">{item.totalPrice}</span>
                            </p>
                            <div className="pt-4">
                              <Tooltip
                                content="Remove from the Cart"
                                placement="bottom"
                              >
                                <Button
                                  onClick={() => dispatch(removeFromCart(item))}
                                  size="sm"
                                  color="red"
                                  ripple={true}
                                  variant="filled"
                                >
                                  Remove
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </DialogBody>
                <DialogFooter className="flex justify-between items-center">
                  <p className="text-black text-base font-inter tracking-normal leading-none pt-2">
                    Total Price: <span className="ml-2">Ksh. {totalPrice}</span>
                  </p>
                  <Button
                    className="bg-green-500 "
                    onClick={() => {
                      setOpenCheckout(true);
                    }}
                  >
                    Check Out
                  </Button>
                </DialogFooter>
              </div>
            </div>
          ) : (
            <div className="w-full h-screen flex justify-center items-center p-[20px]">
              <div className="bg-white rounded-md border-0 outline-0">
                <DialogHeader className="flex justify-between">
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
                <DialogBody divider>
                  <div>
                    <h1 className="text-black text-3xl font-inter font-bold tracking-normal leading-none py-4">
                      Your bag is empty
                    </h1>
                    <p className="text-black text-base font-inter tracking-normal leading-none ">
                      Add some products
                    </p>
                  </div>
                </DialogBody>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center p-[20px]">
          <Checkout closeModal={closeModal} setOpenCheckout={setOpenCheckout} />
        </div>
      )}
    </div>
  );
};

export default Cart;

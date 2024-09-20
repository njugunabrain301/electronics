"use client";
import React, { useState } from "react";
import { removeFromCart } from "@/utils/frontendAPIs/cart";
import { useGlobalContext } from "@/Context/context";
import { pushEvent } from "@/utils/gtag";
import CartContent from "./Content/Cart";

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
    let event = {
      event: "remove_from_cart",
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
    };
    let dataLayer = window.dataLayer || [];
    dataLayer.push(event);
    pushEvent("event", "remove_from_cart", event);
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
    event = {
      event: "begin_checkout",
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
    };
    dataLayer.push(event);
    pushEvent("event", "begin_checkout", event);
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
    <CartContent
      closeModal={closeModal}
      showPrice={showPrice}
      totalPrice={totalPrice}
      cart={cart}
      checkoutInfo={checkoutInfo}
      single={single}
      openCheckout={openCheckout}
      setOpenCheckout={setOpenCheckout}
      theme={theme}
      removing={removing}
      removeItemFromCart={removeItemFromCart}
      initiateCheckout={initiateCheckout}
      removeTags={removeTags}
      resizeProdImage={resizeProdImage}
    />
  );
};

export default Timeless;

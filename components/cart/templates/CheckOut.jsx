import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/context";
import { anonymousCheckout, checkout } from "@/utils/frontendAPIs/cart";
import { pushEvent } from "@/utils/gtag";
import CheckoutContent from "./Content/CheckOut";

function Checkout({
  closeModal,
  setOpenCheckout,
  totalPrice,
  checkoutInfo,
  showPrice,
  cart,
  single,
}) {
  let [error, setError] = useState("");

  const hasPayOnDelivery = (id) => {
    let allows = false;
    checkoutInfo.deliveryLocations.map((loc) => {
      if (loc._id == id && loc.payOnDelivery) {
        allows = true;
      }
    });
    return allows;
  };

  let [counties, setCounties] = useState(checkoutInfo.counties);
  let [subCounties, setSubCounties] = useState([]);
  let [couriers, setCouriers] = useState([]);
  let [deliveryTime, setDeliveryTime] = useState("");
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const [section, setSection] = useState(0);
  let deliveryLocations = checkoutInfo.deliveryLocations;
  let paymentOptions = checkoutInfo.paymentOptions;
  const [payOptions, setPayOptions] = useState([]);
  const cartTotal = totalPrice;

  let deliveryDetails = window.localStorage.getItem("deliveryDetails")
    ? JSON.parse(window.localStorage.getItem("deliveryDetails"))
    : {};
  const [code, setCode] = useState("");
  const [county, setCounty] = useState(deliveryDetails.county || "");
  const [subcounty, setSubCounty] = useState(deliveryDetails.subcounty || "");
  const [courier, setCourier] = useState(deliveryDetails.courier || "");
  const [specifications, setSpecification] = useState(
    deliveryDetails.description || ""
  );
  const [payOnDelivery, setPayOnDelivery] = useState(
    deliveryDetails.courier
      ? hasPayOnDelivery(deliveryDetails.courier.id)
      : false
  );
  const [mode, setMode] = useState(
    deliveryDetails.courier && hasPayOnDelivery(deliveryDetails.courier.id)
      ? "Payment on delivery"
      : ""
  );
  let [deliveryCost, setDeliveryCost] = useState(
    deliveryDetails.courier && hasPayOnDelivery(deliveryDetails.courier.id)
      ? "Payment on delivery"
      : 0
  );
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [phone, setPhone] = useState(user.phone ? user.phone : "");
  const [fullDeliveryTime, setFullDeliveryTime] = useState(
    user.phone ? user.phone : ""
  );

  // console.log(courier, checkoutInfo);

  const setUpMode = (mode) => {
    setMode(mode);
    if (mode === "Payment on delivery") {
      setPaymentInfo({ type: mode });
    } else
      paymentOptions.map((opt) => {
        if (opt.type === mode) {
          setPaymentInfo(opt);
        }
        return opt;
      });
  };

  useEffect(() => {
    if (paymentOptions && paymentOptions.length > 0) {
      if (mode === "") {
        setMode(paymentOptions[0].type);
        setUpMode(paymentOptions[0].type);
      }

      let opt = [];
      if (payOnDelivery) opt.push("Payment on delivery");
      paymentOptions.map((op) => {
        opt.push(op.type);
        return op;
      });

      setPayOptions(opt);
    }
  }, [paymentOptions, mode]);

  const setUpSubCounties = (county) => {
    setPayOnDelivery(false);
    let added = [];
    county = county.replaceAll("*", "");
    if (county && county !== "") {
      let subs = [];
      deliveryLocations.map((loc) => {
        if (
          ((loc.sameday && sameday === "sameday") ||
            (loc.nextday && sameday === "nextday")) &&
          loc.county.replaceAll("*", "") === county
        ) {
          if (!added.includes(loc.subcounty)) {
            subs.push(loc.subcounty + "" + (loc.payOnDelivery ? "*" : ""));
            added.push(loc.subcounty);
          }
        }
        return loc;
      });
      setSubCounties(subs);
      setSubCounty("");
      setCourier("");
      setDeliveryCost(0);
    } else {
      setSubCounty("");
      setSubCounties([]);
      setCouriers([]);
      setCourier("");
      setDeliveryCost(0);
    }
  };

  const setUpCouriers = (subcounty) => {
    setPayOnDelivery(false);
    let mcounty = county.replaceAll("*", "");
    subcounty = subcounty.replaceAll("*", "");
    if (mcounty !== "" && subcounty !== "") {
      let couriers = [];
      deliveryLocations.map((loc) => {
        if (
          ((loc.sameday && sameday === "sameday") ||
            (loc.nextday && sameday === "nextday")) &&
          loc.county.replaceAll("*", "") === mcounty &&
          loc.subcounty.replaceAll("*", "") === subcounty
        ) {
          couriers.push({
            label:
              loc.courier +
              " - " +
              loc.description +
              " " +
              (loc.payOnDelivery ? "(Pay on delivery)" : ""),
            id: loc._id,
          });
        }
        return loc;
      });
      setCourier("");
      setDeliveryCost(0);
      setCouriers(couriers);
    } else {
      setCouriers([]);
      setCourier("");
      setDeliveryCost(0);
    }
  };

  const getDeliveryFee = (v) => {
    if (county !== "" && subcounty !== "" && v) {
      let fee = 0;
      let payOnDelivery = false;
      deliveryLocations.map((loc) => {
        if (loc._id === v.id) {
          fee = loc.price;
          payOnDelivery = loc.payOnDelivery;
        }
        return loc;
      });
      if (payOnDelivery) {
        setPayOnDelivery(true);
        setUpMode("Payment on delivery");
        setPayOptions(["Payment on delivery", ...payOptions]);
      } else {
        setPayOnDelivery(false);
        setPayOptions(payOptions.filter((p) => p !== "Payment on delivery"));
      }
      setDeliveryCost(fee);
    } else {
      setDeliveryCost(0);
    }
  };

  const getDeliveryTime = (v) => {
    if (county !== "" && subcounty !== "" && v) {
      let time = "";
      deliveryLocations.map((loc) => {
        if (loc._id === v.id) {
          time = loc.time;
        }
        return loc;
      });

      let currTime = new Date();
      let cuttOff = timeToDate(checkoutInfo.shipping.cutoffTime);

      let arrivalTime = new Date();
      if (isBefore(currTime, cuttOff)) {
        //add transit time to handling time
        let handlingTime = 0;
        let unit = "hours";
        let amount = 0;
        //get handling time and
        if (checkoutInfo.shipping.handlingType === "constant") {
          unit = checkoutInfo.shipping.handlingTime.unit;
          amount = checkoutInfo.shipping.handlingTime.amount;
        } else {
          unit = "hours";
          amount = 1;
          cart.map((itm) => {
            if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === "weeks" &&
              (unit === "days" || unit === "hours")
            ) {
              unit = "weeks";
              amount = itm.handlingTime.amount;
            } else if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === "days" &&
              unit === "hours"
            ) {
              unit = "days";
              amount = itm.handlingTime.amount;
            } else if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === unit
            ) {
              amount =
                itm.handlingTime.amount > amount
                  ? itm.handlingTime.amount
                  : amount;
            } else if (itm.handlingTime) {
              unit = itm.handlingTime.unit.toLowerCase();
              amount = itm.handlingTime.amount;
            }
          });
        }

        if (unit.toLowerCase() === "weeks") handlingTime = amount * 7 * 24;
        else if (unit.toLowerCase() === "days") handlingTime = amount * 24;
        else if (unit.toLowerCase() === "hours") handlingTime = amount;
        time += handlingTime;
        time = time * 60;
        arrivalTime.setMinutes(arrivalTime.getMinutes() + time);
      } else {
        time += 24;
        arrivalTime = timeToDate(checkoutInfo.shipping.earliestShipTime);

        time = time * 60;
        arrivalTime.setMinutes(arrivalTime.getMinutes() + time);
      }
      let days = dateDiffDays(arrivalTime, new Date());

      setDeliveryTime(
        arrivalTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) +
          " " +
          (days === 0
            ? "today"
            : days === 1
            ? "tomorrow"
            : "on " + arrivalTime.toDateString())
      );
      setFullDeliveryTime(
        arrivalTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) + arrivalTime.toDateString()
      );
    } else {
      setDeliveryTime("");
      setFullDeliveryTime("");
    }
  };
  let { setCart } = useGlobalContext();
  const [c_error, setCError] = useState("");
  const [success, setSuccess] = useState(false);
  let authUser = localStorage.getItem("user") ? true : false;

  const handleCheckout = async () => {
    if (isLoading) return;
    if (county === "" || subcounty === "" || courier === "") {
      setCError("Fill in all delivery details");
      return;
    }
    if (showPrice && mode === "") {
      setCError("Please select a payment mode");
      return;
    }
    if (showPrice && mode !== "Payment on delivery" && code === "") {
      setCError("Please provide a payment code");
      return;
    }

    setIsLoading(true);
    let dataLayer = window.dataLayer || [];
    // let event = {
    //   event: "purchase",
    //   totalPrice: Number(cartTotal),
    // };

    let event = {
      event: "purchase",
      transaction_id: "",
      totalPrice: Number(cartTotal),
      value: cartTotal,
      tax: 0,
      shipping: deliveryCost,
      currency: "KES",
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
    pushEvent("event", "purchase", event);
    let res = {};
    if (authUser) {
      res = await checkout({
        code,
        courier: courier.id,
        mode,
        total: Number(cartTotal) + Number(deliveryCost),
        single,
        specifications,
        cart,
        fullDeliveryTime,
      });
    } else {
      res = await anonymousCheckout({
        name,
        phone,
        email,
        cart,
        code,
        courier: courier.id,
        specifications,
        mode,
        total: Number(cartTotal) + Number(deliveryCost),
        single,
        fullDeliveryTime,
      });
    }
    if (res.success) {
      setSuccess(true);
      if (!single) setCart(res.data);
      deliveryDetails = {
        county: county,
        subcounty: subcounty,
        courier: courier,
        description: specifications,
      };
      localStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails));
    }

    setIsLoading(false);
  };

  const openSection = (sec) => {
    // console.log(sec, "to be opened");
    setCError("");
    if (sec === 2) {
      if (name === "" || email === "" || phone === "") {
        setCError("Fill in all profile information");
        return;
      }
      if (!/(^\d{10}$)|(^\+\d{12}$)/.test(phone)) {
        setCError("Invalid Phone Number. Use 0712345678 or +254712345678");
        return;
      }
      if (
        !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
      ) {
        setCError("Invalid Email");
        return;
      }

      if (authUser) {
        if (county === "" || subcounty === "" || courier === "") {
          setCError("Please select a delivery solution");
          setSection(0);
          return;
        } else {
          let event = {
            event: "add_shipping_info",
            currency: "KES",
            value: cartTotal,
            coupon: "",
            shipping_tier: "Ground",
            items: cart.map((itm, idx) => {
              return {
                item_id: itm._id,
                item_name: itm.name,
                affiliation: "",
                coupon: "",
                discount: 0,
                index: idx,
                price: itm.price,
                quantity: itm.amount,
              };
            }),
          };
          let dataLayer = window.dataLayer || [];
          dataLayer.push(event);
          pushEvent("event", "add_shipping_info", event);
        }
      }

      setSection(sec);
    } else if (sec === 1) {
      if (county === "" || subcounty === "" || courier === "") {
        setCError("Please select a delivery solution");
        return;
      } else {
        let event = {
          event: "add_shipping_info",
          currency: "KES",
          value: cartTotal,
          coupon: "",
          shipping_tier: "Ground",
          items: cart.map((itm, idx) => {
            return {
              item_id: itm._id,
              item_name: itm.name,
              affiliation: "",
              coupon: "",
              discount: 0,
              index: idx,
              price: itm.price,
              quantity: itm.amount,
            };
          }),
        };
        let dataLayer = window.dataLayer || [];
        dataLayer.push(event);
        pushEvent("event", "add_shipping_info", event);
        setSection(sec);
      }
    } else {
      setSection(sec);
    }
  };

  const { theme } = useGlobalContext();

  useEffect(() => {
    if (authUser) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [authUser]);

  const [sameday, setSameDay] = React.useState("nextday");
  const setDeliveryDay = (val) => {
    if (val === sameday) return;
    setSameDay(val);
    setCounty("");
    setSubCounty("");
    setCourier("");

    let locs = [];
    deliveryLocations.map((loc) => {
      if (
        ((loc.sameday && val === "sameday") ||
          (loc.nextday && val === "nextday")) &&
        !locs.includes(loc.county.replaceAll("*", ""))
      ) {
        locs.push(loc.county);
      }
      return loc;
    });
    setCounties(locs);
  };

  useEffect(() => {
    if (courier) {
      getDeliveryFee(courier);
      getDeliveryTime(courier);
    }
  }, [courier]);

  return (
    <CheckoutContent
      closeModal={closeModal}
      setOpenCheckout={setOpenCheckout}
      showPrice={showPrice}
      error={error}
      counties={counties}
      subCounties={subCounties}
      couriers={couriers}
      deliveryCost={deliveryCost}
      deliveryTime={deliveryTime}
      section={section}
      payOptions={payOptions}
      cartTotal={cartTotal}
      code={code}
      setCode={setCode}
      county={county}
      setCounty={setCounty}
      subcounty={subcounty}
      setSubCounty={setSubCounty}
      courier={courier}
      setCourier={setCourier}
      specifications={specifications}
      setSpecification={setSpecification}
      payOnDelivery={payOnDelivery}
      mode={mode}
      paymentInfo={paymentInfo}
      isLoading={isLoading}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phone={phone}
      setPhone={setPhone}
      setUpMode={setUpMode}
      setUpSubCounties={setUpSubCounties}
      setUpCouriers={setUpCouriers}
      getDeliveryFee={getDeliveryFee}
      getDeliveryTime={getDeliveryTime}
      c_error={c_error}
      setCError={setCError}
      success={success}
      authUser={authUser}
      handleCheckout={handleCheckout}
      openSection={openSection}
      theme={theme}
      sameday={sameday}
      setDeliveryDay={setDeliveryDay}
    />
  );
}

export default Checkout;

const timeToDate = (time) => {
  // Get the current date
  let date = new Date();

  // Parse the time string
  let [hours, minutes] = time.split(":").map(Number);

  // Set the hours and minutes of the date object
  date.setHours(hours, minutes, 0, 0);

  return date;
};

// Returns true if date1 is before date2
const isBefore = (date1, date2) => {
  if (date1.getHours() > date2.getHours()) {
    // console.log("Current time is later than the target time.");
    return false;
  } else if (date1.getHours() < date2.getHours()) {
    // console.log("Current time is earlier than the target time.");
    return true;
  } else {
    if (date1.getMinutes() > date2.getMinutes()) {
      // console.log("Current time is later than the target time.");
      return false;
    } else if (date1.getMinutes() < date2.getMinutes()) {
      // console.log("Current time is earlier than the target time.");
      return true;
    } else {
      // console.log("Current time is the same as the target time.");
      return true;
    }
  }
};

const dateDiffDays = (date1, date2) => {
  // Calculate the difference in milliseconds
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
    return date1.getDate() - date2.getDate();
  return 10;
};

"use client";

import { useGlobalContext } from "@/Context/context";
import ShippingContent from "./Content";

const Timeless = ({ shipping, deliveryLocations, profile }) => {
  const { titleFont } = useGlobalContext();
  const formatDeliveryTime = (time) => {
    let days = Math.floor(time / 24);
    let hours = Math.floor(time % 24);
    let minutes = ((time % 24) - hours) * 60;
    let res = days > 0 ? days + " days " : "";
    res += hours > 0 ? hours + " hours " : "";
    res += minutes > 0 ? minutes + " minutes" : "";
    return res;
  };

  function convertToAMPM(time) {
    // Split the time string into hours and minutes
    var splitTime = time.split(":");
    var hours = parseInt(splitTime[0]);
    var minutes = parseInt(splitTime[1]);

    // Determine if it's AM or PM
    var period = hours >= 12 ? "PM" : "AM";

    // Adjust hours to 12-hour format
    hours = hours > 12 ? hours - 12 : hours;

    // Add leading zero to minutes if necessary
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the formatted time string
    var formattedTime = hours + ":" + minutes + " " + period;

    return formattedTime;
  }

  return (
    <ShippingContent
      shipping={shipping}
      deliveryLocations={deliveryLocations}
      profile={profile}
      titleFont={titleFont}
      formatDeliveryTime={formatDeliveryTime}
      convertToAMPM={convertToAMPM}
    />
  );
};

export default Timeless;

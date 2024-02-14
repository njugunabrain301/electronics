"use client";

import { useGlobalContext } from "@/Context/context";

const Timeless = ({ shipping, deliveryLocations, profile }) => {
  const { titleFont } = useGlobalContext();

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto pb-[50px]">
      <h1
        className={
          titleFont.className +
          " text-3xl md:text-5xl text-center pt-[50px] pb-[20px]"
        }
      >
        Shipping Policy
      </h1>
      {shipping.accept
        ? "We offer shipping services for our orders using a variety of trusted couriers. Shipping costs are calculated and included before you proceed to checkout"
        : "We're delighted to offer in-store pickup for your convenience! At this time, we don't provide shipping services."}
      {shipping.accept && (
        <>
          {shipping.guarantee
            ? "We guarantee that goods delivered will be delivered without any damage"
            : "While we strive to ensure safe delivery, please note that we cannot guarantee goods will arrive without any damage"}
          {shipping.handlingType === "custom" && (
            <p>
              Please allow varying processing times for orders before they are
              shipped; these details will be clearly outlined in the product
              description.
            </p>
          )}
          {shipping.handlingType === "constant" && (
            <p>
              We take a maximum of{" "}
              {shipping.handlingTime.amount + " " + shipping.handlingTime.days}{" "}
              to process and package an order before we ship it to the client
            </p>
          )}
          <p>
            To qualify for same-day shipping, be sure to place your order by
            {" " + shipping.cutoffTime}
          </p>
          <h2 className={"mt-[10px] " + titleFont.className}>
            Here are all the places we deliver to with the associated times and
            costs
          </h2>
          <table className="mb-[20px] ">
            <thead>
              <tr className="font-bold">
                <td className="p-1">County</td>
                <td className="p-1">Subcounty</td>
                <td className="p-1">Pick-up station</td>
                <td className="p-1">Courier</td>
                <td className="p-1">Cost</td>
                <td className="p-1">Time</td>
              </tr>
            </thead>
            <tbody>
              {deliveryLocations.map((loc, idx) => (
                <tr>
                  <td className="p-1">{loc.county}</td>
                  <td className="p-1">{loc.subcounty}</td>
                  <td className="p-1">{loc.description}</td>
                  <td className="p-1">{loc.courier}</td>
                  <td className="p-1">{loc.price + " Ksh."}</td>
                  <td>
                    {loc.time > 24
                      ? loc.time / 24 + " day(s) " + (loc.time % 24) + " hrs"
                      : loc.time + " hrs"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            If you don't find your location listed, just let us know! We'll be
            happy to arrange delivery through a trusted courier.
          </p>
          <p>
            If your order hasn't arrived within the expected timeframe, please
            don't hesitate to reach out to us at {profile.phone}
          </p>
        </>
      )}
    </div>
  );
};

export default Timeless;

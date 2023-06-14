import React from "react";
import { DialogBody, Typography, Tooltip } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="flex justify-center items-center">
      <DialogBody divider className="flex flex-col justify-center items-center">
        {orders.map((item, index) => {
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
                    Selected size: <span className="ml-2">{item.size}</span>
                  </p>
                  <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                    Selected color:{" "}
                    <span
                      className="ml-2 rounded-full px-2"
                      style={{ backgroundColor: item.color }}
                    ></span>
                  </p>
                  <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                    Amount: <span className="ml-2">{item.amount}</span>
                  </p>
                  <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                    Single Item Price:{" "}
                    <span className="ml-2">{item.price}$</span>
                  </p>
                  <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                    Total Item Prices:{" "}
                    <span className="ml-2">{item.totalPrice}$</span>
                  </p>
                  <div className="pt-4">
                    <Tooltip content="Status" placement="bottom">
                      <Typography className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Status:{" " + item.status}
                      </Typography>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </DialogBody>
    </div>
  );
}

export default Orders;

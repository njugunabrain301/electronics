import React, { useEffect } from "react";
import { DialogBody, Typography, Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/slices/ordersSlice";

function Orders() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const orders = useSelector((state) => state.orders.orders);

  return (
    <div className="flex justify-center items-center">
      <DialogBody divider className="flex flex-col justify-center items-center">
        {orders
          .filter((o) => o != null)
          .reverse()
          .map((item, index) => {
            return (
              item && (
                <div
                  key={index}
                  className="my-[10px] bg-gray-100 p-[7px] rounded-md"
                  style={{ border: "solid 1px gray" }}
                >
                  <div className="grid grid-cols-2 py-4">
                    <div>
                      <img
                        className="h-[125px] rounded-md"
                        src={item.img}
                        alt={item.name}
                        style={{ aspectRatio: "3/2" }}
                      ></img>
                      <div className="flex flex-col items-start">
                        <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                    <div className="pl-[20px]">
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Size: <span className="ml-2">{item.size}</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Color:{item.color === "-" ? " -" : ""}
                        <span
                          className="ml-2 rounded-full px-2"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Amount: <span className="ml-2">{item.amount}</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Price:{" "}
                        <span className="ml-2">{"Ksh. " + item.price}</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Total:{" "}
                        <span className="ml-2">
                          {"Ksh. " + Number(item.price) * Number(item.amount)}
                        </span>
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
                  <div className="max-w-xs">
                    <p className="text-black text-xs font-inter tracking-normal leading-none pt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            );
          })}
      </DialogBody>
    </div>
  );
}

export default Orders;

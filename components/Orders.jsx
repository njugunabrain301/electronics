"use client";
import { fetchOrders } from "@/utils/frontendAPIs/orders";
import { DialogBody, Typography, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let loadOrders = async () => {
    let res = await fetchOrders();
    setOrders(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="flex justify-center items-center bg-skin-primary">
      <DialogBody
        divider
        className="flex flex-col justify-center items-center"
        style={{ maxWidth: "800px", width: "90%" }}
      >
        <Typography variant="h4">
          <p className="text-skin-base font-inter font-bold tracking-normal leading-none pt-2">
            My Orders
          </p>
        </Typography>
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : orders ? (
          orders
            .filter((o) => o != null)
            .reverse()
            .map((item, index) => {
              return (
                item && (
                  <div
                    key={index}
                    className="my-[10px] bg-skin-panel border border-skin-panel p-[7px] rounded-md"
                    style={{
                      width: "100%",
                    }}
                  >
                    <div className="grid grid-cols-2 py-4">
                      <div className="text-skin-base">
                        <div>
                          <Image
                            className=" rounded-md max-w-full"
                            src={item.img}
                            alt={item.name}
                            width={300}
                            height={500}
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <h4 className=" text-base font-inter font-bold tracking-normal leading-none pt-2">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                      <div className="pl-[20px] text-skin-base">
                        <p className="text-sm font-inter tracking-normal leading-none pt-2">
                          Size: <span className="ml-2">{item.size}</span>
                        </p>
                        <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                          Color:{item.color === "-" ? " -" : ""}
                          <span
                            className="ml-2 rounded-full px-2"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </p>
                        <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                          Amount: <span className="ml-2">{item.amount}</span>
                        </p>
                        <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                          Price:{" "}
                          <span className="ml-2">{"Ksh. " + item.price}</span>
                        </p>
                        <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                          Total:{" "}
                          <span className="ml-2">
                            {"Ksh. " + Number(item.price) * Number(item.amount)}
                          </span>
                        </p>
                        <div className="pt-4">
                          <Tooltip content="Status" placement="bottom">
                            <Typography className=" text-sm font-inter tracking-normal leading-none pt-2">
                              Status:&nbsp;
                              {item.status === "RECEIVED"
                                ? "PROCESSING"
                                : item.status}
                            </Typography>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-xs text-skin-base">
                      <p className=" text-xs font-inter tracking-normal leading-none pt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              );
            })
        ) : (
          <p>Kindly log in in order to get your orders</p>
        )}
      </DialogBody>
    </div>
  );
}

export default Orders;

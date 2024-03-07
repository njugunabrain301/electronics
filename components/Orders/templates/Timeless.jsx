"use client";
import { useGlobalContext } from "@/Context/context";
import {
  downloadReceipt,
  downloadURL,
  fetchOrders,
} from "@/utils/frontendAPIs/orders";
import { DialogBody, Typography, Tooltip } from "@material-tailwind/react";
import { Download } from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";

function Timeless() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadStatus, setDownloadStatus] = useState("Download Recepit");
  let loadOrders = async () => {
    let res = await fetchOrders();
    setOrders(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const { theme } = useGlobalContext();

  const downloadReceiptH = async (oid) => {
    if (downloadStatus === "Downloading...") return;
    setDownloadStatus("Downloading...");
    let url = downloadURL + "/" + oid;
    let bid = process.env.NEXT_PUBLIC_STORE_ID;
    const mtoken = localStorage.getItem("token");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        business: bid,
        Authorization: `Bearer ${mtoken}`,
      },
      mode: "cors",
      next: { revalidate: 0 },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = "Receipt.pdf";
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        setDownloadStatus("Download Recepit");
      })
      .catch((err) => {
        console.log("");
        setDownloadStatus("Download Recepit");
      });
  };

  console.log(orders);
  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <DialogBody
        className="flex flex-col justify-center items-center"
        style={{ maxWidth: "800px", width: "90%" }}
      >
        <Typography variant="h4">
          <p
            className="font-inter font-bold tracking-normal leading-none pt-2"
            style={{ color: theme.palette.text.base }}
          >
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
                    className="my-[10px] border p-[7px] rounded-md"
                    style={{
                      width: "100%",
                      backgroundColor: theme.palette.panel.main,
                      borderColor: theme.palette.panel.border,
                      color: theme.palette.text.base,
                    }}
                  >
                    <div className="grid grid-cols-2 py-4">
                      <div className="">
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
                          <h4 className="font-inter font-bold tracking-normal leading-none pt-2">
                            {item.name}
                          </h4>
                        </div>
                      </div>
                      <div className="pl-[20px]">
                        <p className="text-sm font-inter tracking-normal leading-none pt-2">
                          Order ID:{" "}
                          <span className="ml-2">{item._id.slice(15)}</span>
                        </p>

                        {item.size.trim() !== "-" && (
                          <p className="text-sm font-inter tracking-normal leading-none pt-2">
                            Size: <span className="ml-2">{item.size}</span>
                          </p>
                        )}
                        {item.color.trim() !== "-" && (
                          <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                            Color:{item.color === "-" ? " -" : ""}
                            <span
                              className="ml-2 rounded-full px-2"
                              style={{ backgroundColor: item.color }}
                            ></span>
                          </p>
                        )}
                        {item.selectedOption && (
                          <p className="text-sm font-inter tracking-normal leading-none pt-2">
                            Option:{" "}
                            <span className="ml-2">{item.selectedOption}</span>
                          </p>
                        )}
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
                        {item.arrivalDate && (
                          <p className="text-sm font-inter tracking-normal leading-none pt-2">
                            Arrival:{" "}
                            <span className="ml-2">{item.arrivalDate}</span>
                          </p>
                        )}
                        <div className="pt-4">
                          <Tooltip content="Status" placement="bottom">
                            <Typography className="text-sm font-inter tracking-normal leading-none pt-2 w-fit">
                              Status:&nbsp;
                              {item.status === "RECEIVED"
                                ? "PROCESSING"
                                : item.status}
                            </Typography>
                          </Tooltip>
                        </div>
                        <div className="pt-1">
                          <Tooltip
                            content="Download Receipt"
                            placement="bottom"
                          >
                            <Typography
                              className="text-sm font-inter tracking-normal leading-none pt-2 w-fit cursor-pointer"
                              onClick={() => downloadReceiptH(item._id)}
                            >
                              <>
                                <Download /> {downloadStatus}
                              </>
                            </Typography>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-full">
                      <p className=" text-xs font-inter tracking-normal leading-none pt-2">
                        {removeTags(item.description).slice(0, 100) + "..."}
                      </p>
                    </div> */}
                  </div>
                )
              );
            })
        ) : (
          <p style={{ color: theme.palette.text.base }}>
            Kindly log in in order to get your orders
          </p>
        )}
      </DialogBody>
    </div>
  );
}

export default Timeless;

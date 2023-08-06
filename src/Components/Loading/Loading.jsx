import React from "react";
import "./css/style.css";

function Loading() {
  let categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div style={{ backgroundColor: "#ddd", width: "100%" }} id="loading-screen">
      <div className="darker" style={{ height: "60px", width: "100%" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="darker"
          style={{
            margin: "10px 20px",
            borderRadius: "7px",
            width: "10%",
            backgroundColor: "#aaa",
            minWidth: "80px",
            height: "30px",
          }}
        ></div>
        <div
          className="darker"
          style={{
            margin: "10px 20px",
            backgroundColor: "#aaa",
            borderRadius: "7px",
            width: "10%",
            minWidth: "80px",
            height: "30px",
          }}
        ></div>
      </div>
      <div
        className="darker font md:text-xl lg:text-2xl sm:text-md"
        style={{
          height: "60px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <div
        style={{
          width: "80%",
          margin: "20px auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="w-[100%] md:w-[48%] m-[0px] md:-mr-[10px] mb-[10px] darker"
          style={{
            aspectRatio: "3/2",
            backgroundColor: "#aaa",
            borderRadius: "7px",
          }}
        ></div>
        <div
          className="w-[100%] md:w-[48%] "
          style={{
            aspectRatio: "3/2",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            className="darker"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#aaa",
              borderRadius: "7px",
              marginBottom: "10px",
            }}
          ></div>
          <div
            className="darker"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#ccc",
              borderRadius: "7px",
              marginBottom: "10px",
            }}
          ></div>
          <div
            className="darker"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#ccc",
              borderRadius: "7px",
            }}
          ></div>
          <div
            className="darker"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#ccc",
              borderRadius: "7px",
            }}
          ></div>
        </div>
      </div>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          padding: "20px 0",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {categories.map((e, index) => (
          <div
            key={index}
            className="darker"
            style={{
              margin: "10px 20px",
              backgroundColor: "#ccc",
              borderRadius: "7px",
              minWidth: "100px",
              width: "15%",
              height: "45px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Loading;

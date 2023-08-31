import React from "react";
import styles from "./loading.module.css";

function Loading() {
  let categories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div style={{ width: "100%" }} className={styles.loading}>
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
          className="w-[100%] md:w-[48%] m-[0px] md:-mr-[10px] mb-[10px] darker animate-pulse"
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
            className="darker animate-pulse"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#aaa",
              borderRadius: "7px",
              marginBottom: "10px",
            }}
          ></div>
          <div
            className="darker animate-pulse"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#ccc",
              borderRadius: "7px",
              marginBottom: "10px",
            }}
          ></div>
          <div
            className="darker animate-pulse"
            style={{
              width: "48%",
              aspectRatio: "3/2",
              backgroundColor: "#ccc",
              borderRadius: "7px",
            }}
          ></div>
          <div
            className="darker animate-pulse"
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
            className="darker animate-pulse"
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

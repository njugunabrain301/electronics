import React from "react";
import "./css/underConstruction.css";

function UnderConstruction() {
  return (
    <div className="underconstruction">
      <h1 className="title">The Website is Currently Under Construction</h1>
      <div className="table-container">
        <div className="table">
          <div className="extended-table"></div>
        </div>
      </div>

      <div className="block-container">
        <div className="block diagonal-block"></div>
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>

      <div className="hammer-container">
        <div className="hammer">
          <div className="hammer-head"></div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;

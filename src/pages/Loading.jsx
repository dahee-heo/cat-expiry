import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export function Loading() {
  return (
    <div class="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <PulseLoader
          color="#FF6B00"
          margin={2}
          size={10}
        />
        <p style={{
          marginTop: "10px",
          fontSize: "14px"
        }}>로딩중입니다.</p>
      </div>
    </div>
  );
}

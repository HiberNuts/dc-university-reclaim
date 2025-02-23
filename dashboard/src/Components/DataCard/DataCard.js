import React, { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./DataCard.css";

export const DataCard = ({ title, data, onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // Perform any async actions here if needed

      // Call the onClick callback
      if (onClick) {
        await onClick(data);
      }
    } catch (error) {
      console.error("Error handling click:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="DataCard" style={{overflow:'hidden'}} onClick={handleClick}>
  <span style={{ fontSize: '25px', fontWeight: 'bold', color: 'var(--shardeum-blue)' }}>{title}</span>
  {loading ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BeatLoader color="indigo" style={{ marginTop: "50px" }} />
    </div>
  ) : (
    <span className="datacardno">{data}</span>
  )}
</div>


  );
};

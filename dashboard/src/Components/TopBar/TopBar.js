import React from "react";
import "./TopBar.css";
import { AiOutlineLogout } from "react-icons/ai";

export const TopBar = () => {
	return (
		<div className="TopBar">
			<div className="logoutbtn" style={{ marginRight: "30px" }}>
				<p style={{ marginRight: "10px" }}>Shardeum</p>
			</div>
		</div>
	);
};

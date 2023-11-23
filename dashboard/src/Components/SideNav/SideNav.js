import React from "react";
import "./SideNav.css";
import { ImStatsDots } from "react-icons/im";
import logo from '../../assets/nav.png'

export const SideNav = () => {
	return (
		<div className="sidenav">
			<div
				className="sidenavtitle"
				// onClick={() => {
				// 	navigate("/");
				// }}
			>
				<a href="/" style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
                    <img src={logo} alt="Logo" style={{ height: '50px' }} /><span>Shardeum University</span>
                </a>

			</div>
			<div className="innersidenav">
				<a
					href="/"
					className="sidenavitems"
					// onClick={() => {
					// 	navigate("/");
					// }}
				>
					<ImStatsDots className="sidenavicons" />
					<p>Dashboard</p>
				</a>
				
			
			</div>
		</div>
	);
};

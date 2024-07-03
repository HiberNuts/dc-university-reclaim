import React from "react";
import "./SideNav.css";
import { RiAdminFill } from "react-icons/ri";
import { GiWhiteBook } from "react-icons/gi";
import logo from '../../assets/nav.png'
import { FaCode } from "react-icons/fa";
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
	
				>
					<GiWhiteBook className="sidenavicons" />
					<p>Courses Overview</p>
				</a>
				<a
					href="/administrators"
					className="sidenavitems"
	
				>
					<RiAdminFill className="sidenavicons" />
					<p>Administrator</p>
				</a>
				<a
					href="/contests"
					className="sidenavitems"
	
				>
					<FaCode className="sidenavicons" />
					<p>Contests overview</p>
				</a>
				
			
			</div>
		</div>
	);
};

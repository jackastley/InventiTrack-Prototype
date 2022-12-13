
import React from "react";
import { Link } from "react-router-dom";
import CustomLink from "../utils/customRouterLink";
import logo from "./Inventium_logo_RGB.png"

export default function NavBar() {

    return (
        <>
            <div className="background-colouring"></div>
            <nav className="navBar">
                <ul className="list-sec">
                    <li>
                        <div className="nav-text-container">
                            <Link to="/dashboard">
                                <img src={logo} alt="test" width={"100px"} id="logo" />
                            </Link>
                        </div>
                    </li>

                    <CustomLink to="/dashboard" ><p>Dashboard</p></CustomLink>
                    <CustomLink to="/track" ><p>Track</p></CustomLink>
                    <CustomLink to="/monthly-survey" ><p>Monthly Survey</p></CustomLink>
                    <li>
                        <div className="nav-text-container">
                            <Link to="/logout" ><p>Logout</p></Link>
                        </div>
                    </li>
                </ul>
            </nav>
            <br />
            <br />
            <br />
        </>
    );
}
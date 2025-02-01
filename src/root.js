import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";

export default function Root() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}
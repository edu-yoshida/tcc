import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div className="flex">
      <Sidebar />

      {/* Área onde as páginas privadas aparecem */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

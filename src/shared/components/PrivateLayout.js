import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import useAuthStore from "../store/auth-store";

export default function PrivateLayout() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      fetchUser(); 
    }
  }, [token, fetchUser]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 relative">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

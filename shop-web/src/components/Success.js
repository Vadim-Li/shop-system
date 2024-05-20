import { Navigate, NavLink, Outlet } from "react-router-dom";

function Success() {
  return (
    <>
      <NavLink
        style={{ textAlign: "center", color: "#A6A6A6", width: "120px" }}
        to="home"
      >
        {/* 首页 */}Home
      </NavLink>
      <alert>payment successful!</alert>
    </>
  );
}

import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="content_container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;

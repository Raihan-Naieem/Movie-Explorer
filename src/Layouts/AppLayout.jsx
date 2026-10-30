import { Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

export function AppLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />

        <Outlet />

        <Footer />
      </div>
    </>
  );
}

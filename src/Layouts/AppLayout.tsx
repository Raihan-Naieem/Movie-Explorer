import { Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";

export function AppLayout() {
  return (
    <>
      <div className="h-screen flex flex-col justify-between">
        <Navbar />

        <div className="bg-blue-700">
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

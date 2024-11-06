import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      {/* <div className=""> */}
      <div className="content bg-white w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;

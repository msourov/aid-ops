import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />
      {/* <div className=""> */}
      <div className="content bg-white w-full">
        <Outlet />
      </div>
      {/* </div> */}
    </div>
  );
};

export default AppLayout;

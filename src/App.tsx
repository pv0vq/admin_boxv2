import { Outlet } from "react-router-dom";
import SideBar from "./layouts/SideBar";

function App() {
  return (
    <div>
      <SideBar>
        <Outlet />
      </SideBar>
    </div>
  );
}

export default App;

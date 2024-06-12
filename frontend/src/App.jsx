import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SideBarMenu from "./components/SideBarMenu";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={ <div className="app">
            <SideBarMenu>
              <Header />
              <Routes>
                {/*<Route path="/orders" element={ <Dashboard /> } />*/}
              </Routes>
              <ToastContainer />
            </SideBarMenu>
            </div> }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
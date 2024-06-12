import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SideBarMenu from "./components/SideBarMenu";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from './pages/Products/Products';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={ <div className="app">
            <SideBarMenu>
              <Header />
              <Routes>
                <Route path="/products" element={ <Products /> } />
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
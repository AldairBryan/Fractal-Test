import React from "react";
import { NavLink } from "react-router-dom";
import menuItems from "../pathMenu/MenuItemsPath";
import "../styles/SideBarMenuStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function SideBarMenu({ children }) {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(
    JSON.parse(localStorage.getItem("isOpen")) || false
  );
  const [activeItemIndex, setActiveItemIndex] = React.useState(
    JSON.parse(localStorage.getItem("activeItemIndex")) || 0
  );

  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  const handleItemClick = (index) => setActiveItemIndex(index);

  React.useEffect(() => {
    localStorage.setItem("activeItemIndex", JSON.stringify(activeItemIndex));
  }, [activeItemIndex]);

  React.useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const handleLogout = () => {
    logout();
  };


  return (
    <div className="container_sidebar">
      <div
        style={
          isOpen
            ? { width: "210px" }
            : { width: "100px", padding: "13px 5px", gap: 5 }
        }
        className="sidebar"
      >
        <div
          className="burger"
          style={{ justifyContent: isOpen ? "" : "center" }}
        >
          <img
            src="/src/assets/WhiteIcons/BurgerIcon.png"
            alt="burger"
            onClick={toggle}
          />
        </div>
        <div
          className="contenedor-mc"
          style={{
            width: isOpen ? "" : "100px",
            alignItems: isOpen ? "stretch" : "center",
          }}
        >
          <p className="hsub">Modules</p>
          {menuItems().map((item, index) => (
            <React.Fragment key={item.name}>
              {index === 6 && <p className="hsub">Components</p>}
              <SidebarItem
                item={item}
                isOpen={isOpen}
                active={index === activeItemIndex}
                onClick={() => handleItemClick(index)}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

function SidebarItem({ item, isOpen, active, onClick }) {
  const { path, iconWhite, name } = item;
  const isComponent = item.isComponent || false;

  return (
    <NavLink
      to={path}
      className={`link-item ${isOpen ? "" : "comprimido"} ${
        active ? "active" : ""
      }`}
      onClick={onClick}
      style={{ justifyContent: isOpen ? "" : "center" }}
      key={name}
    >
      <div
        className={`${
          isOpen
            ? isComponent
              ? "iconCom"
              : "iconMod"
            : isComponent
            ? "iconComComp"
            : "iconModComp"
        }`}
      >
        <img src={iconWhite} alt="icono" />
      </div>
      <p className={`${isOpen ? "text" : "textComp"}`}>{name}</p>
    </NavLink>
  );
}

export default SideBarMenu;
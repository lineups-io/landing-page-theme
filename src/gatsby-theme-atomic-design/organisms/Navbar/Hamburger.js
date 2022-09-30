import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import {
  HamburgerMenu,
  Menu,
} from './styled'

import "./Hamburger.css";

const Hamburger = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <HamburgerMenu open={open} className={open ? "menu-open" : ""}>
          <button type="button" className="header__hamburger hamburger" aria-label="Open Menu" aria-pressed="false" data-menu="toggle" onClick={() => setOpen(!open)}>
            <span className="hamburger__wrapper">
              <span className="hamburger__bun"></span>
              <span className="hamburger__bun"></span>
              <span className="hamburger__bun"></span>
              <span className="hamburger__bun"></span>
            </span>
          </button>
          <Menu>{children}</Menu>
        </HamburgerMenu>
      </OutsideClickHandler>
  )
}

export default Hamburger

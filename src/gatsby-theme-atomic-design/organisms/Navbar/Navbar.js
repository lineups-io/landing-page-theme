import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Brand,
  Menu,
  MenuItem,
  FeaturedMenuItem,
} from "./styled"

import { ReactComponent as Logo } from "./logo.svg"
import Hamburger from "./Hamburger"

const Navbar = ({ menu = [] }) => {
  const menuItems = menu.map((item, i) =>
    <MenuItem key={i} href={item.href}>{item.title}</MenuItem>
  )

  menuItems.push(
    <FeaturedMenuItem key="find-a-community" href="locations">
      <span>Find a Community</span>
      <FontAwesomeIcon icon={faArrowRight} />
    </FeaturedMenuItem>
  )

  return (
    <Container>
      <Brand>
        <Logo />
      </Brand>
      <Menu>{menuItems}</Menu>
      <Hamburger>{menuItems}</Hamburger>
    </Container>
  )
}

export default Navbar;

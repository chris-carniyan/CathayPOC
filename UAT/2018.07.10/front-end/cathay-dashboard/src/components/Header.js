// Core
import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
// Utility
import Helper from "../utility/Helper";
// CSS
import classes from "../assets/css/Header.css";

class Header extends Component {
  render() {
    return (
      <Menu fixed="top" borderless className={classes.header}>
        <Menu.Item>
          <Image
            src="/assets/images/cathay-logo.jpg"
            className={classes.logo}
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item className={classes.customerName}>
            {Helper.getQueryParameters().header.employeeId}
          </Menu.Item>
          <Menu.Item className={classes.headerRight}>
            僅供內部使用，嚴禁外流
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
export default Header;

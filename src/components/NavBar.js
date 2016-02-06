import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
//connectToStores is a higher-order component that provides a convenient way to access state
//from the stores from within your component. It takes care of defining getInitialState and listening
//to the stores for updates. The store state will be sent to the Component instance as props.
import { NavLink } from "fluxible-router";

import Logo from "../components/Logo";

import menuOptions from "../constants/menuOptions";
import LocaleSwitcher from "../components/LocaleSwitcher";

if (process.env.BROWSER) {
  require("../style/NavBar.scss");
}

@connectToStores([], context =>
  ({ route: context.getStore("RouteStore").getCurrentRoute() })//Think of this as getIntialState...it gets the state from the store
)
export default class NavBar extends Component {

  static PropTypes = {
    route: PropTypes.object.isRequired
  }

  removeUnderscores(text) {
   return text.split('_').join(' ');
  }

  render() {
    const { route } = this.props;// same as var route = this.props.route
    const currentmenuItem = route ? route.getIn(["params", "day"]) : null;//This is a built routing functions that gets the last parameter of the route.

    return (
      <div className="NavBar">
        <div className="NavBar-title">
          <NavLink href="/">
            <Logo />
          </NavLink>
        </div>
        <div className="NavBar-links">
          {
            menuOptions.map(menuItem => {{/*Iterates over menu links and creates nav links around them for routing*/}
              let className = "NavBar-link";

              if (currentmenuItem === menuItem) {//Builds selected class
                className = `${className} ${className}--selected`;
              }
              let menuOption = this.removeUnderscores(menuItem);//the menu item is the day. ex: 'Today'
              return (
                <NavLink
                  key={ menuItem }
                  className={ className }
                  routeName="menuOption"
                  navParams={ {day: menuItem} }>{/*This is a cool feature where {day: menuItem} represents day/Today for example*/}
                  <div>{menuOption}</div>
                </NavLink>
              );
            })
          }
        </div>
        <div className="NavBar-locales">
          <LocaleSwitcher />
        </div>
      </div>
    );
  }

}

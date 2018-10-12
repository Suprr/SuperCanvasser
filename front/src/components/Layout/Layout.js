import React, { Component } from "react";

import Aux from "../../hoc/Auxx";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar";
import Sidebar from "../Navigation/Sidebar";
import MenuData from "./MenuData";
class Layout extends Component {
  state = {
    menus: MenuData.menus
  };

  render() {
    let sidebar = null;
    if (this.props.user.role === "manager") {
      sidebar = <Sidebar className="h-100" menus={this.state.menus.manager} />;
    } else if (this.props.user.role === "canvasser") {
      sidebar = (
        <Sidebar className="h-100" menus={this.state.menus.canvasser} />
      );
    } else {
      sidebar = <Sidebar className="h-100" menus={this.state.menus.sysAdmin} />;
    }

    return (
      <Aux>
        <div className={["row", "fixed-top"].join(" ")}>
          <Toolbar user={this.props.user} />
        </div>

        <div className={["row", "fixed-center", classes.Content].join(" ")}>
          <div className={["col-2", classes.Sidebar].join(" ")}>{sidebar}</div>

          <div className={["col-10"].join(" ")}>{this.props.children}</div>
        </div>
      </Aux>
    );
  }
}

export default Layout;

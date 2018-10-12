import React, { Component } from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends Component {

  
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log("[Modal] willUpdate()");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />

        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}

          <div
            className={[classes.ModalBtn, "row", "justify-content-center"].join(
              " "
            )}
          >
            <button className="btn btn-light" onClick={this.props.modalClosed}>
              Go Back
            </button>
          </div>
        </div>
      </Aux>
    );
  }
}

export default Modal;

import React,{Component} from 'react'
import classes from "./MessageBox.module.css";
import Aux from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";



class MessageBox extends Component{
	//render

	shouldComponentUpdate(nextProps, nextState) {
   		 return (
	      	nextProps.show !== this.props.show ||
	      	nextProps.children !== this.props.children
	   	 );
	  }

	render(){
		return(
		<Aux>
        	<Backdrop show={this.props.show} clicked={this.props.modalClosed} />

	        <div
	          className={classes.MessageBox}
	          style={{
	            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
	            opacity: this.props.show ? "1" : "0"
	          }}
	        >	
		        <div className = {classes.MessageArea}>
		          {this.props.message}
	          	</div>
		          <div
		            className={[classes.MessageBoxBtn, "row", "justify-content-center"].join(
		              " "
		            )}
		          >
	            <button className={["btn", "btn-light", classes.OkayBtn].join(" ")} onClick={this.props.modalClosed}>
	              Ok
	            </button>
	      		</div>
        	</div>
      </Aux>);

	}
}

export default MessageBox;
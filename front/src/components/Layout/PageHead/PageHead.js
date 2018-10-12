import React, {Component} from 'react'
import classes from './PageHead.module.css'

class PageHead extends Component{

	render(){
		let body = (<div className = {[classes.PageHead].join(' ')}>
				<h4 className = {[classes.Title]}> {this.props.title}</h4>
				</div>);
		
		if(this.props.subtitle){
			body = (
				<div className = {[classes.PageHead].join(' ')}>
					<h4 className = {[classes.Title]}> {this.props.title}</h4>
					<h5 className = {[classes.SubTitle].join(' ')}>{this.props.subtitle}</h5>
				</div>);
		}

		return body;
		
	}

}

export default PageHead;
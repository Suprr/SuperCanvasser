
import React, { Component } from "react";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import classes from './CampaignResult.module.css'

class TableViewLocations extends Component{
	state = {
		isMounted:false,
		location:null,
		show : false
	}

   componentDidMount(){
   	console.log(['TableViewLocations'], this.props.location);
   		if(this.props.location){
				
				this.setState( { isMounted: true }, () => {
				  		
	          	  		
				       //axios then axios get locations by sending task ID
				       //so I can get questionnaire infos from backend. 
			          if(this.state.isMounted){
			          	console.log(['TableViewLocations'])
			            this.setState({location : this.props.location});              
			          }
		        });
			}
   }

 //   componentDidUpdate(prevProps) {
	// 	console.log(['TableViewLocations Update'], this.props.location);
	// 	if (this.props.location !== prevProps.location) {
	// 	    if(this.props.location){
				
	// 			this.setState( { isMounted: true }, () => {
				  		
	          	  		
	// 			       //axios then axios get locations by sending task ID
	// 			       //so I can get questionnaire infos from backend. 
	// 		          if(this.state.isMounted){
	// 		          	console.log(['TableViewLocations'])
	// 		            this.setState({location : this.props.location});              
	// 		          }
	// 	        });
	// 		}
	// 	  }
	// }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

    showQuestionnaireHandler=()=>{
    	this.setState(prevState=>({
    		show : !prevState.show
    	}));
    }

	render(){
		 console.log(['TableViewLocations render'],this.state.location);

		const questionnaires = this.state.location?(this.state.location.qNa?Object.keys(this.state.location.qNa).map(key=>{
														    let value = this.state.location.qNa[key];
														   
														   	return <div key={key} className={[classes.QuestionnaireItem, 'row'].join(' ')}>
														   		<div className={[classes.Question, 'col-9'].join(' ')}>
														   			{key}
														   		</div>
														   		<div className={[classes.Answer, 'col-3'].join(' ')}>
														   			{value?'Yes':'No'}
														   		</div>
														   	</div>;
														}):null):null;

		const questionnaireTable = this.state.show?(<div><div className={[classes.QuestionnaireHead,'row'].join(' ')}>
						<div className={[classes.Question, 'col-9'].join(' ')}>
				   			Questions
				   		</div>
				   		<div className={[classes.Answer, 'col-3'].join(' ')}>
				   			Answers
				   		</div>
				   	</div>

					<div className={[classes.QuestionnaireTable].join(' ')}>
						{questionnaires}
					</div>
					</div>):null;

		return <div className={classes.LocationSection}>
					<div className={['row', classes.TableViewItem].join(' ')}>
						<div className={['col-3', classes.TableViewAttr].join(' ')}>
							Location 
						</div>
						<div className={['col-9', classes.TableViewAttrText].join(' ')}>
							{this.state.location?this.state.location.address:null}
						</div>
					</div>

					<div className={['row', classes.TableViewItem].join(' ')}>
						<div className={['col-3', classes.TableViewAttr].join(' ')}>
							Questionnaire 
						</div>

						<div className={['col-3'].join(' ')}>
							<button className={['btn', 'btn-danger', classes.ShowBtn].join(' ')} onClick={this.showQuestionnaireHandler}>Show</button>
						</div>
					</div>
					
					{questionnaireTable}
					

			   </div>
	}
}

export default TableViewLocations; 
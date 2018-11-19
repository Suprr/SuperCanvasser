import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'
import axios from '../../../axios'
import RemoveIcon from '../../../assets/images/minus.png'
class AddedManagers extends Component{
	state = {
		isMounted :false,
		managers : [],
	}

	componentDidUpdate(prevProps) {
	
		if (this.props.managers !== prevProps.managers) {
		    if(this.props.managers.length!=0){
				
				this.setState( { isMounted: true }, () => {
				  
	          	  axios.post('/manager/campaign/view/man', this.props.managers).then(resoponse=>{
	          	  	let managersArray = [];
	          	  	
	          	  	for(let i=0; i<resoponse.data.length; i++){
	          	  		let manager = resoponse.data[i];
	          	  		managersArray.push(manager);
	          	  	}
	          	  	
	          	  	if(this.state.isMounted){
			            this.setState(prevState=>({
			            	managers: managersArray
			            }));
			          }
	          	  }).catch(err=>{
		  			//invalid date pop up
		  			console.log(['AddedManagers err'],err)
		  			})
		        });
			}
		  }
	}

	componentWillUnMount(){
	    this.setState({isMounted:false});
	  }

	render(){
		console.log(this.state.managers)
		let managers = this.state.managers.map(manager => {
			let mng = <div key={manager._id}> {manager.firstName + " "+ manager.lastName} <input type="image" className={classes.RemoveBtn} onClick={(event)=>this.props.removeHandler(event)} name = {manager._id} src={RemoveIcon}/></div>
			return mng ;
		});

		return(
			<div className={[classes.HiddenSection, 'row', 'justify-content-center'].join(' ')}>
				<div className='col-6'>
				{managers}
				</div>
			</div>
		);
	}

}

export default AddedManagers;
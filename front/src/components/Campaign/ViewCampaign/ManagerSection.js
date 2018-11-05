import React, {Component} from 'react'
import classes from './ViewCampaign.module.css'
import axios from '../../../axios'
class ManagerSection extends Component{
	state = {
		...this.props,
		managers  : null
	}

	//should create a method for getting managers info from user.
	componentDidMount(){

	    this.setState( { isMounted: true }, () => {
	          axios.post('/manager/campaign/view/man',this.props.managers).then(response=>{
	           
	          const managerData = response.data
	          

	          if(this.state.isMounted){
	            console.log('ViewCampaign', 'UPLOADED', managerData);
	            this.setState({managers:managerData})                
	          }
	        }).catch(error=>{
	          console.log(error)
	        })
	    });

   }
  
  componentWillUnMount(){
    this.setState({isMounted:false});
  }

	render(){
		console.log(['ManagerSection'],this.props.managers)
		let managers =  this.state.managers ? this.state.managers.map(mng=>{
			//<div className={[classes.Unknown, 'rounded-circle', 'text-center'].join(' ')}></div>
			let manager = (
					  <div key={mng._id} className={['row',classes.Manager].join(' ')}> 
						<div className={[classes.ManagerName, 'col-7', 'text-center'].join(' ')}>{mng.firstName+" "+mng.lastName}</div>
					 </div>);

			return manager;
		}) : null ;

		return(
			//<div className = {['container'].join(' ')}>
					
				<div className = {[classes.ManagerSection,'col-10', 'text-center'].join(' ')}>
					<div className = {['row'].join(' ')}>
						<h4 className={['col-11', classes.Title].join(' ')}>Managers</h4> 
					</div>

					<div className = {['col-12', classes.ManagerBody].join(' ')}>
						{managers}
					</div>
				</div>

			//</div>
		);
	}

}

export default ManagerSection;
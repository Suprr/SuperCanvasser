import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class AddLocation2 extends Component{
		state={
			newLocations : '',
			showProgressBar : false,
			isMounted: false,
		}

		handleInputChange = (event)=> {
		    const target = event.target;
		    const value = target.value;
		    const name = target.name;
		    
	   	 	this.setState({[name]: value });
		}
		
		addLocation=()=>{
			this.props.onClick(this.state)
			this.setState({
				newLocations : '',
				showProgressBar: true,
			})
		}

		componentDidUpdate(prevProps) {
			console.log(['component'], this.props.isUpdatedLocation);
			if (prevProps.isUpdatedLocation != this.props.isUpdatedLocation) {
			   
					
					this.setState( { isMounted: true }, () => {
		          	  	if(this.state.isMounted){
				            this.setState(prevState=>({
				            	showProgressBar: false
				            }), this.props.updateHandler);
				          }
		          	 });
				}
		}

		componentWillUnMount(){
		    this.setState({isMounted:false});
		  }

		render(){
			console.log(['Render'], this.state.showProgressBar)
			const location = (
				<div className={['row'].join(' ')}>
					<div className='col-2 text-center'>
					</div> 
					<div className={['col-7'].join(' ')}>
					
						<textarea 	
								name = 'newLocations'
								placeholder='Addresses'
								value = {this.state.newLocations}
								className = {[classes.TPTextField].join(' ')}
								onChange={(event)=>this.handleInputChange(event)}
								/>
					</div>
					

					<div className='col-3 text-center'> 
							<div className='row'>
								<button className = {['btn', 'btn-danger', classes.Btn].join(' ')} onClick = {this.addLocation}>Add Location</button>
							</div>
					</div>
				</div>
			);
			const progressBar = (					<div className={[classes.Section, 'row'].join(' ')}>
<CircularProgressbar
									  percentage={100}
									  initialAnimation={true}
									  text={'Adding Locations'}
									/></div>);

			const showContent = this.state.showProgressBar?progressBar:location;
			
			return( <div className=''>
				
				<div className={[classes.Section, 'row'].join(' ')}>
					<div className='col-3 text-center'> 
						<p>New Locations</p>
					</div>
				</div>
				{showContent}
			</div>);
	}

}

export default AddLocation2;
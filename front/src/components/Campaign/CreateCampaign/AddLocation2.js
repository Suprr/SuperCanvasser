import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'

class AddLocation2 extends Component{
		state={
			newLocations : ''
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
			})
		}

		render(){
		return(
			<div className=''>
				
				<div className={[classes.Section, 'row'].join(' ')}>
					<div className='col-3 text-center'> 
						<p>New Locations</p>
					</div>
				</div>
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
			</div>
				
		);
	}

}

export default AddLocation2;
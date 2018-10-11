import React, {Component} from 'react';

import Sidebar from '../../components/Navigation/Sidebar'
import CampaignList from './CampaignList/CampaignList'

import classes from './Manager.module.css'

class Manager extends Component{
	
	state = {

		campaigns : [
			{
				title : 'Campaign 1',
				startDate : 'Nov 1',
				endDate : 'Nov 2',
				progress : 0,
				id : 'c1'
			},
			{
				title : 'Campaign 2',
				startDate : 'Nov 2',
				endDate : 'Nov 3',
				progress : 0,
				id:'c2'
			},
			{title : 'Campaign 3',
				startDate : 'Nov 3',
				endDate : 'Nov 4',
				progress : 0,
				id:'c3'
			},
			{title : 'Campaign 4',
				startDate : 'Nov 4',
				endDate : 'Nov 5',
				progress : 0,
				id:'c4'
			}
		]
	}

	render(){
		return(
			
				<div className={["col-10", "fixed-center", classes.Manager].join(' ')}>
					<CampaignList campaigns = {this.state.campaigns}/>
				</div>
			
		)
	}

}

export default Manager;
import React, {Component} from 'react'
import classes from './TaskDetail.module.css'
import PageHead from '../../../Layout/PageHead/PageHead'
class TaskDetailHead extends Component{
	render(){
		return <div>
				<PageHead title='View Canvassing Assignment' subtitle={this.props.title} />
			</div>;
	}
}

export default TaskDetailHead;
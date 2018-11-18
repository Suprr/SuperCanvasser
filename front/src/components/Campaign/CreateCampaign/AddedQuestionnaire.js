import React, {Component} from 'react'
import classes from './CreateCampaign.module.css'
import RemoveIcon from '../../../assets/images/minus.png'
class AddedQuestionnaire extends Component{
	

	render(){
		let count = 1;
		let questions = this.props.questionnaire.map(qnr => {
			let qItem = (
				<div className = 'row' key={qnr.id}>
					<div className = 'col-1'> {count}. </div>
					<div className={[classes.QuestionnaireItem, 'col-6'].join(' ')}> {qnr.question} </div>
					<div className = 'col-2'>
						<input type='image' src={RemoveIcon} className={classes.RemoveBtn} onClick={(event)=>this.props.onClick(event)} name={qnr.id}/>
					</div>
				</div>
			)
			count++;
			return qItem ;
		});

		return(
			<div className={[classes.HiddenSection, 'row', 'justify-content-center'].join(' ')}>
				<div className='col-6'>
				{questions}
				</div>
			</div>
		);
	}

}

export default AddedQuestionnaire;
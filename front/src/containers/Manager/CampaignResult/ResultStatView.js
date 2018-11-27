import React, { Component } from "react";
import PageHead from "../../../components/Layout/PageHead/PageHead";
import {withRouter, Route, Switch} from 'react-router-dom'
import axios from '../../../axios'
import classes from './Result.module.css'
import {Pie, Line} from 'react-chartjs-2';
import Dropdown from '../../../components/UI/Dropdown/Dropdown'

class ResultStatView extends Component{

	state = {
		result:null,
		isMounted:false,
		questionnaireList : [],
		answerList : [],
		selectedQuestionnaire : '',
		yes : 0,
		no : 0,
		showChart : false,
		ratingData : [],
	}

	componentDidMount(){
	    const cmpId = sessionStorage.getItem('campaignID')
	    this.setState( { isMounted: true }, () => {
	          axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
	           
	          const campaignData = response.data[0];
	          console.log(['Stat View'], campaignData)
	          
	          axios.post('/manager/result/statView', campaignData).then(res=>{

	          	const resultData = res.data;
	          	console.log(resultData);

	          	let questionnaireList = [];
	          	let answerList = [];

	          	const qnaData = resultData.qNaCount;

				console.log(['stat qna count'],qnaData, typeof(qnaData));
	          	if(qnaData) {

	          		Object.keys(qnaData).forEach(key => {
					    var q = {name : key, _id:key}
					    questionnaireList.push(q);
					    answerList.push(qnaData[key]);
					});
				}


				let one = 0;
				let two = 0;
				let three = 0;
				let four = 0;
				let five = 0;

				for(let i=0; i<resultData.ratings.length; i++){
					const rate = resultData.ratings[i];
					if(rate==1){one++} 
					else if(rate==2){two++}
					else if(rate==3){three++}
					else if(rate==4){four++}
					else{five++}
				}

				const ratingData = [one,two,three,four,five];

	          	if(this.state.isMounted){
		            this.setState({result:resultData, questionnaireList : questionnaireList, answerList : answerList, ratingData:ratingData});               
		        }

	          }).catch(err=>{
		          console.log(err)
	          });
	          
	        }).catch(error=>{
	          console.log(error)
	        })
	    });
   }

    componentWillUnMount(){
      this.setState({isMounted:false});
    } 

    tableViewBtnClickHandler=()=>{
		this.props.history.push('/manager/result/tableView');
    }

    mapViewBtnClickHandler=()=>{
    	this.props.history.push('/manager/result/mapView');
    }


    dropDownHandler = (questionnaire) =>{
		console.log('[dropdownHandler]',questionnaire);
		let index = 0;
		
		for(let i=0; i<this.state.questionnaireList.length; i++){
			if(questionnaire==this.state.questionnaireList[i]){
				index = i;
				break;
			}
		}

		let yes = this.state.answerList[index];
		let no = 100-yes;
		
		console.log(yes, no);
		this.setState({selectedQuestionnaire : questionnaire, yes : yes, no : no, showChart:true});
	}



	render(){
		const data ={
			labels: [
				'Yes',
				'No',
			],
			datasets: [{
				data: [this.state.yes, this.state.no],
				backgroundColor: [
				'#FF6384',
				'#36A2EB'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB'
				]
			}]};

		const ratingData = {
			labels: [1, 2, 3, 4, 5],
			datasets: [
			    {
			      label: 'Ratings',
			      fill: false,
			      lineTension: 0.1,
			      backgroundColor: 'rgba(75,192,192,0.4)',
			      borderColor: '#CD4B56',
			      borderCapStyle: 'butt',
			      borderDash: [],
			      borderDashOffset: 0.0,
			      borderJoinStyle: 'miter',
			      pointBorderColor: 'rgba(75,192,192,1)',
			      pointBackgroundColor: '#fff',
			      pointBorderWidth: 1,
			      pointHoverRadius: 5,
			      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			      pointHoverBorderColor: 'rgba(220,220,220,1)',
			      pointHoverBorderWidth: 2,
			      pointRadius: 1,
			      pointHitRadius: 10,
			      data:this.state.ratingData
			    }
			  ]
		}


		const dropdown = this.state.result? <Dropdown resetThenSet = {this.dropDownHandler} title = {'Select Questionnaire'} list = {this.state.questionnaireList} />:null;
		const lineChart = this.state.result?<Line data={ratingData} />:null;
		const pieChart = this.state.showChart?<Pie data={data}/>:null;

		return(
			<div>
				<PageHead title="Campaign Result - Statistical View" subtitle={this.state.campaign?this.state.campaign.name:null}/>

				
				<div className={['row', classes.BtnSection, 'd-flex', 'justify-content-end'].join(' ')}>
						<button className='btn btn-danger' onClick={this.tableViewBtnClickHandler}>Table View</button>
						<button className='btn btn-danger' onClick={this.mapViewBtnClickHandler}>Map View</button>
				</div>
				{lineChart}
				<div className={['row', classes.StatInfoSection].join(' ')}> 
					
					<div className={['col-4', classes.StateInfo].join(' ')}>
						<div className={classes.TitleOfStat}>Average of Rating</div>  {this.state.result?this.state.result.avgRating:null}
					</div>
					
					<div className={['col-4', classes.StateInfo].join(' ')}>
						<div className={classes.TitleOfStat}>Standar Deviation</div>  {this.state.result?this.state.result.sdRating:null}
					</div>
					
				</div>

				<div className={classes.PieChartSection}>
				{dropdown}
				{pieChart}
				</div>
			</div>);
	}
}

export default withRouter(ResultStatView);
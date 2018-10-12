import React, {Component} from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classes from './CreateCampaign.module.css'
import 'react-datepicker/dist/react-datepicker.css';

//import FormGroup from 'react-bootstrap/lib/FormGroup'
//import ControlLabel from 'react-bootstrap/lib/ControlLabel'
class DateSection extends Component{

  
  render(){
    let dateTitle= null; 
    if(this.props.name==='startDate'){
      dateTitle = "Start Date"
    }else{
      dateTitle = "End Date"
    }

    return(
      <div className={[classes.Section, 'row'].join(' ')}>
        <div className={[classes.Title,'col-3', 'text-center'].join(' ')}> 
          {dateTitle}
        </div>
        <div className = {['col-7', classes.InputSection].join(' ')}>
          <DatePicker
              className = {classes.DatePicker}
              selected={this.props.date}
              onChange={this.props.onChange}
              name = {this.props.name}
          />  
        </div>

      </div>);
  }

}

export default DateSection;

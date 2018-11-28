import React, { Component } from "react";
import Calendar from "../../../components/UI/Calendar/Calendar";
import MessageBox from '../../../components/UI/MessageBox/MessageBox'

import axios from "../../../axios";

import dateFns from "date-fns";
import moment from 'moment';

class EditAvailability extends Component {
  state = {
    inAvailableDates: [],
    mounted: false,
    availData: {
      availabilityDates: []
    },
    show : false,
    message : null,
  }

  onCalendarClick = day => {
    let newInavDates = this.state.inAvailableDates;
    let bool = false;
    for (let i = 0; i < newInavDates.length; i++) {
      if (newInavDates[i].toString() === dateFns.format(day, "YYYY-MM-DD")) {
        bool = true;
        newInavDates.splice(i, 1);
      }
    }
    if (!bool) {
      newInavDates.push(dateFns.format(day, "YYYY-MM-DD"));
    }

    this.correctInvalidDates();
    let newAvailData = this.state.availData;
    newAvailData.availabilityDates = newInavDates;
    this.setState({ inAvailableDates: newInavDates, availData: newAvailData });

    axios.post("/avail/edit", this.state.availData);
  }


  componentDidMount() {
    const userInfoData = JSON.parse(sessionStorage.getItem("userInfo"));
    const userID = userInfoData._id;
    axios
      .get("/avail/get/?_id=" + userID)
      .then(response => {
        this.setState({
          availData: response.data,
          inAvailableDates: response.data.availabilityDates
        }, this.correctInvalidDates());
      })
      .catch(error => {
        console.log("USER ID Error", userID);
        console.log(error);
      });
  }

  correctInvalidDates() {
    let tempInavailDates = this.state.inAvailableDates;
    for (let i = 0; i < tempInavailDates.length; i++) {
      const compareDate = moment(tempInavailDates[i]);
      if((!compareDate.isSame(moment(),'day'))&&moment().isAfter(compareDate)){
        tempInavailDates.splice(i, 1);
        this.showMessageBox('Cannot select previous dates');
      } 
    }
    
    this.setState({ inAvailableDates: tempInavailDates });
  }


   showMessageBox = (message) => {
      this.setState({ show: true , message : message});
    }

    closeMessageBox = () => {
      this.setState({ show: false });
    }

  render() {
    return (
      <div>
       <MessageBox show={this.state.show} modalClosed={this.closeMessageBox} message={this.state.message}/>

        <h1>Edit Availability</h1>
        <div className='col-10'>
        {
          <Calendar
            onClick={this.onCalendarClick}
            inavailable={this.state.inAvailableDates}
          />
        }
        </div>
      </div>
    );
  }
}

export default EditAvailability;

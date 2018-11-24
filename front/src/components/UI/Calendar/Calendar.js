import React from "react";
import dateFns from "date-fns";
import classes from "./Calendar.module.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    inavailableDate: this.props.inavailable
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div
        className={[classes.header, classes.row, classes.fix_middle].join(" ")}
      >
        <div className={[classes.col, classes.col_start].join(" ")}>
          <div className={classes.icon} onClick={this.prevMonth}>
            Previous Month
          </div>
        </div>
        <div className={[classes.col, classes.col_center].join(" ")}>
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className={[classes.col, classes.col_end].join(" ")}>
          <div className={classes.icon} onClick={this.nextMonth}>
            Next Month
          </div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={[classes.col, classes.col_center].join(" ")} key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={[classes.days, classes.row].join(" ")}>{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, inavailableDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={[
              classes.col,
              classes.cell,
              !dateFns.isSameMonth(day, monthStart)
                ? classes.disabled
                : dateFns.isSameDay(day, selectedDate)
                ? classes.selected
                : this.isInavailableDay(day)
                ? classes.inavailable
                : null
            ].join(" ")}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className={classes.number}>{formattedDate}</span>
            <span className={classes.bg}>{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className={classes.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={classes.body}>{rows}</div>;
  }

  onDateClick = day => {
    this.props.onClick(day);
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  isInavailableDay = day => {
    //console.log('isInavailableDay', dateFns.format(day, 'MM DD YYYY'));
    let inavailable = this.props.inavailable;
    if (inavailable) {
      for (let i = 0; i < inavailable.length; i++) {
        if (
          dateFns.format(day, "MM DD YYYY") ==
          dateFns.format(inavailable[i], "MM DD YYYY")
        )
          return true;
      }
    }

    return false;
  };

  render() {
    return (
      <div className={classes.calendar}>
        {this.renderHeader()}
        <div className={classes.calendar_body}>
          {this.renderDays()}
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default Calendar;

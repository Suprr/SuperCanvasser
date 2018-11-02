import React, {Component} from 'react'
import onClickOutside from  'react-onclickoutside'
import './Dropdown.css'
class Dropdown extends Component{

	state = {
		listOpen : false,
		headerTitle: this.props.title
	}

	handleClickOutside(e){
		this.setState({listOpen : false});
	}

	selectItem = (item) => {
	    this.setState({
	      headerTitle: item.campaignTitle,
	      listOpen: false
    	}, this.props.resetThenSet(item))
  	}

  	toggleList = () => {
	    this.setState(prevState => ({
	      listOpen: !prevState.listOpen
	    }))
	  }

  render(){
	    const list = this.props.list
	    const listOpen = this.state.listOpen
	    const headerTitle =  this.state.headerTitle

	    return(
	      <div className="dd-wrapper">
	        <div className="dd-header row" onClick={this.toggleList}>
	          <div className="dd-header-title">{headerTitle}</div>
	          <span className="dropdown-toggle"></span>
	        </div>
	        {listOpen && <ul className="dd-list">
	          {list.map((item)=> (
	            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item)}>{item.campaignTitle}</li>
	          ))}
	        </ul>}
	      </div>
	    )
  }
}

export default onClickOutside(Dropdown);
import React, {Component} from 'react'
import ManagerItem from './ManagerItem'

class ManagerList extends Component{
	state = {
		managers : null,
		isMounted : false
	}
	
	componentDidMount(){
	    
	    this.setState( { isMounted: true }, () => {
	         //  axios.get('/manager/campaign/view/?_id='+cmpId).then(response=>{
	           
		        //   const managerList = response.data;

		        //   if(this.state.isMounted){
		        //     this.setState({managers:managerList});
		        //   }
		        // }).catch(error=>{
		        //   console.log(error)
		        // })
	    });
   }
  
  componentWillUnMount(){
    this.setState({isMounted:false});
  }

  render(){
		let managerList = this.state.managers?  this.state.managers.map(mng =>{
			let manager = <ManagerItem selectManager={this.props.selectManager}manager={mng}/>
			return manager;
		}): null;
		return <div>
			{managerList}
		</div>;
	}
}

export default ManagerList;
import React, {Component} from 'react';
import {Modal} from './Modal';


class Item extends Component {
	render(){
		const {name, prioritet, startDate, count} = this.props;
		
		return(
			<div className="tableDiv" id="divmiv">
				<table className="myTables" id="myTable" >
				  <tr >
				    <th id="index">{count}</th>
				    <th id="th">{name}</th>
				    <th id="th">{prioritet}</th> 
				    <th id="th">{startDate}</th>
				    <th id="edit">
				      <div> 
				        <button id="delete" onClick={this.props.showModal(count)}> Edit </button > 
				        <button id="delete" onClick={this.props.onClick(count)} > X </button >
				      </div>
				    </th> 
				  </tr>
  				</table>
			</div>
		);
	}
}

export {Item};


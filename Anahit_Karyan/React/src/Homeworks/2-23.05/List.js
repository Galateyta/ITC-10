import React ,{Component} from 'react';
 
class  List extends Component {
  render () {
    return (
      <div>
        <h1> List to Works </h1>
        <ul> 
        	{this.props.works.map((item, index) => (
        		<li key={item.id}> 
            		<input value={item.work}/>
	        		<input value={item.priority}/>
                	<input value={item.date}/>
                	<button > Change </button>
	        		<button onClick={this.props.deleteWork(index)}> Delete </button>
        		 </li> 
        		))}
        </ul>
      </div>
   );
  } 
}
export  default List;


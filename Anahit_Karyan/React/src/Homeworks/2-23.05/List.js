import React ,{Component} from 'react';
 

class  List extends Component {
  render () {
    return (
      <div>
        <h1> List to Works </h1>
        <ul> 
        	{this.props.works.map((item, index) => (
        		<li key={item.id}> 
	        		{item.work} 
	        		<button > Delete </button>
        		 </li> 
        		))}
        </ul>
      </div>
   );
  } 
}
export  default List;


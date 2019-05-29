iimport React from 'react';
 
function CreateElement (props) {
  const {text, color} = this.props;
  return (
    <div>
      <h1 style={{"color": color}} > {text} {color} </h1> 
    </div>
  );
} 

export default  CreateElement;

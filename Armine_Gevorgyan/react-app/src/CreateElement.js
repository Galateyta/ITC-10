import React from 'react';
 
function CreateElement (props) {
  const text = props.text;
  const color = props.color;  
  return (
    <div>
      <h1 style={{"color": color}} > {text} {color} </h1> 
    </div>
  );
} 

export default  CreateElement;

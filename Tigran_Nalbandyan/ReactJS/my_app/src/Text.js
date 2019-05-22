import React from 'react';

function Text(props) {
  const text = props.text;
  const color = props.color;
  return (
    <div >
      <span style={{"color": color}}>{text}</span>
    </div>
  );
}

export default Text;

import React from 'react';

function Text(props) {
  const {color, text} = props;
  return (
    <div >
      <span style={{"color": color}}>{text}</span>
    </div>
  );
}

export default Text;

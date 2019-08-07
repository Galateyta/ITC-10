import React, { Component } from 'react';

class Text extends Component {
	 constructor(props) {
    	super(props);
		this.state = {
			text: props.text,
	        color: props.color
	    };
	}
    render() {
        return (
            <p style={{color:this.state.color}}>
               {this.state.text}
            </p>
        );
    }
}


export default Text;
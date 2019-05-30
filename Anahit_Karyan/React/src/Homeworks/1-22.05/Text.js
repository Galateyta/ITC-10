import React, { Component } from 'react';

class Text extends Component {
    render() {
        return (
            <p style={{color:this.props.color}}>
               {this.props.text}
            </p>
        );
    }
}

export default Text;
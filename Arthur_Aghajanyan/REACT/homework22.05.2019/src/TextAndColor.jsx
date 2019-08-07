import React from 'react';
import './App.css';

class TextAndColor extends React.Component {
    render(){
        return <h1 className="h1_style" style={{color : this.props.textColor}}>{this.props.name}</h1>;
    }
}
export default TextAndColor;

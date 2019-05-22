import React from 'react';
import './App.css';

class ParentComponent extends React.Component {
    render(){
      return (
            <div className="ParentComponent">
                <TextAndColor name="Hello" textColor="red"/>
                <TextAndColor name="React" textColor="yellow"/>
                <TextAndColor name="My" textColor="blue"/>
                <TextAndColor name="First" textColor="green"/>
                <TextAndColor name="Project" textColor="orange"/>
            </div>
      );
    }
}
class TextAndColor extends ParentComponent {
    render(){
        return <h1 class="h1_style" style={{color : this.props.textColor}}>{this.props.name}</h1>;
    }
}

export default ParentComponent;

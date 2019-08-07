import React from 'react';
class Color extends React.Component {
    render(){
        return (
            <div className='blue'>
                Component, {this.props.name}
            </div>
        );
    }
}
export default Color;
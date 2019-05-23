import React from 'react';
class Blue extends React.Component {
    render(){
        return (
            <div className='blue'>
                Component, {this.props.name}
            </div>
        );
    }
}
export default Blue;
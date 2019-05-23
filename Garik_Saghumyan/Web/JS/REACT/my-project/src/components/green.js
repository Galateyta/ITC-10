import React from 'react';
class Green extends React.Component {
    render(){
        return(
            <div className='green'>
                Component, {this.props.name}
            </div>
        );
    }
}
export default Green;
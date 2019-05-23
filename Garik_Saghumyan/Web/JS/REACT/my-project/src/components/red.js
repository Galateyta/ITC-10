import React from 'react';
class Red extends React.Component {
    render(){
        return(
            <div className='red'>
                Component, {this.props.name}
            </div>
        );
    }
}
export default Red;
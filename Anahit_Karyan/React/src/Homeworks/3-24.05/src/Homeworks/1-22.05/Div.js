import React, { Component } from 'react';
import Text from './Text';
class Div extends Component {
    render() {
        return (
            <div>
                <Text text="My text 1" color="#896"/>
                <Text text="My text 2" color="#063"/>
                <Text text="My text 3" color="#219"/>
                <Text text="My text 4" color="#102"/>
            </div>
        );
    }
}

export default Div;
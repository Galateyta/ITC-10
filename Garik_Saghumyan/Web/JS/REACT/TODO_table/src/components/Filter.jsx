import React, { Component } from 'react';
import {InputGroup, Container, Input, InputGroupAddon } from 'reactstrap';

class Filter extends Component {

    render() {
        const {  onChangeFilter } = this.props;
        return (
            <Container>
                <br />
                <InputGroup syze="sm">
                    <InputGroupAddon addonType="prepend">FILTER</InputGroupAddon>
                    <Input type="text" onChange={onChangeFilter}></Input>
                </InputGroup>
                <br />
            </Container>
        );
    }
}
export default Filter;
import React, {Component} from 'react';
import './1.css';

class Input extends Component {
    state = {
        name: '',
        prioritet: '',
        startDate: '',
    }

    onChange = (item) => (e) => {
    this.onChange = this.onChange.bind(this);
        if(e.target ) {
            this.setState({
                [item]: e.target.value
            });
        }
    }

    renderInput = () => {
        return Object.keys(this.state).map( (item) => {
            if(item == 'name') {
                return (
                    <input
                      type='text'
                      id="name"
                      required
                      minlength="2"
                      placeholder={item}
                      onChange={this.onChange(item)}
                    />
                    );
            } else if(item == 'startDate') {
                return (
                    <input
                    required
                    type="date"
                    id="name"
                    name="trip-start"
                    value={this.state.startDate}
                    min="2000-01-01"
                    onChange={this.onChange(item)}
                  />
                );
            } else if(item == 'prioritet') {
                return (
                    <select id="mySelect" required name="select" id="name" onChange={this.onChange(item)}>
                    <option required value="0" onChange={this.onChange(item)}>Prioritet</option>
                    <option required value="1" onChange={this.onChange(item)}>Hign</option>
                    <option required value="2" onChange={this.onChange(item)}>Medium</option>
                    <option required value="3" onChange={this.onChange(item)}>Low</option>
                    </select>
                );
            }
        })
    };

	render(){
		return(
			<div className="inputDiv">
                <form onSubmit={this.props.onSubmit(this.state,this)}>
                    {this.renderInput()}
                    <button id="myButton"  type="submit" id="name" value="Submit" >Add</button>
                </form>
			</div>
		);
	}
}

export {Input};

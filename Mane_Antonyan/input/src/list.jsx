import React from 'react';

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.state = {body: ''};
        this.state = {date: ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({name: event.target.name});
        this.setState({body: event.target.body});
        this.setState({date: event.target.date});
        this.setState({date: event.target.prioraty});
    }
  
    handleSubmit(event) {
        alert('Send name ' + this.state.name + this.state.body + this.state.date + this.state.prioraty);
        event.preventDefault();
    }
  
    render() {
        return (
            <div>
                <div class="left">
                    <h1 className="text-center">Plan your task</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <textarea type="text" placeholder="Task name" class="input name" value={this.state.name} onChange={this.handleChange}/>
                            <textarea type="text" placeholder="Task" class="input body" value={this.state.body} onChange={this.handleChange}/>
                            <div>
                                <textarea type="text" placeholder="Date" class="input date" value={this.state.dste} onChange={this.handleChange}/>
                                <textarea type="text" placeholder="Prioraty" class="input prioraty" value={this.state.prioraty} onChange={this.handleChange}/>
                            </div>
                        </label>
                    <input type="submit" value="Send" class="button" />
                    </form>
                </div>
                <div class="right">
                    <h1 className="text-center">Your tasks</h1>
                </div>
            </div>
        );
    }
}

export default NameForm;
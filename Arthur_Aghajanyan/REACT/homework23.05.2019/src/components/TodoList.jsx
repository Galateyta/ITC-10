import React from 'react';


class TodoList extends React.Component {
  state = {items: this.props.items}

    render() {
        return (
            <div className="text-overflow">
                {this.state.items.map((item, index) => (
                <div className="class-text" key={item.id}>
                    <button id="buttonForClose" onClick={() => this.props.removeItem(index)}>x</button>
                    <p className="style-date">date : {item.date}</p>
                    <p>{item.text}</p>
                </div>
                ))}
            </div>
        );
    }
}
export default TodoList;

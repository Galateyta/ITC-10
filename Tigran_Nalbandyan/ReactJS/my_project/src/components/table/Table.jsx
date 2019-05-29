import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';

class Table extends Component {
  state = {
    columns: [
      {
        title: 'Name',
        field: 'name'
      }, {
        title: 'Date',
        field: 'date',
        type: 'date',
        customSort: (a, b) => new Date(a.date) - new Date(b.date)
      }, {
        title: 'Priority',
        field: 'priority',
        lookup: {
          0: 'Low',
          1: 'Medium',
          2: 'High'
        },
        customSort: (a, b) => a.priority - b.priority
      }
    ],
    data: [
      {
        name: 'Do something',
        date: '10.02.2004',
        priority: 1
      }, {
        name: 'Become a billionaire',
        date: '02.09.2024',
        priority: 2
      }
    ]
  };

  render() {
    return (
      <div className="table"><MaterialTable
        title="Table"
        columns={this.state.columns}
        data={this.state.data}
        sorting
        editable={{
        onRowAdd: newData => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const data = [...this.state.data];
            data.push(newData);
            this.setState({
              ...this.state,
              data
            });
          }, 600);
        }),
        onRowUpdate: (newData, oldData) => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const data = [...this.state.data];
            data[data.indexOf(oldData)] = newData;
            this.setState({
              ...this.state,
              data
            });
          }, 600);
        }),
        onRowDelete: oldData => new Promise(resolve => {
          setTimeout(() => {
            resolve();
            const data = [...this.state.data];
            data.splice(data.indexOf(oldData), 1);
            this.setState({
              ...this.state,
              data
            });
          }, 600);
        })
      }}/></div>
    );
  }
}

export default Table;
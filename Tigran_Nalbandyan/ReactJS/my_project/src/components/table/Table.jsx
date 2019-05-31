import React, {Component} from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import Chart from 'react-google-charts';
import {Grid} from '@material-ui/core';

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
        customSort: (a, b) => new Date(a.date) - new Date(b.date),
        render: (data) => this.toDate(data.date)
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

  toDate = string => new Date(string).toDateString()

  priorities = {
    0: 'Low',
    1: 'Medium',
    2: 'High'
  }

  render() {
    return (
      <div id="table">
        <Grid container direction="row" spacing={5}>
          <MaterialTable
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
          }}/>
          <div id="chart">
            <Chart
              chartType="AreaChart"
              loader={(
              <div>Loading Chart</div>
            )}
              data={[
              ['Date', 'Priority']
            ].concat(this.state.data.sort((a, b) => new Date(a.date) - new Date(b.date)).map((item, index) => [
              {v: new Date(item.date), f: this.toDate(item.date)}, {
                v: item.priority,
                f: this.priorities[item.priority]
              }
            ]))}
              options={{
              title: 'Table chart',
              hAxis: {
                title: 'Year',
                titleTextStyle: {
                  color: '#333'
                }
              },
              vAxis: {
                minValue: 0,
                maxValue: 2
              },
              chartArea: {
                width: '50%',
                height: '70%'
              }
            }}/>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Table;
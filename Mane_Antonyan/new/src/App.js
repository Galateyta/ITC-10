import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const { PureComponent } = React;

class App extends PureComponent {
   constructor(props) {
      super(props);

      this.state = {
         open: false,

         formState: {
            id: '',
            TaskName: "",
            Date: "",
            Priority: "",
            mode: "submit"
         },
      
         tasks: [
            {
               id: 0,
               TaskName: "Default",
               Date: "Always",
               Priority: "high",
               updating: false
            }
         ]
      };
   }
    
   resetFormState = () => {
      this.setState({
         formState: {
            TaskName: "",
            Date: "",
            Priority: "",
            mode: "submit",
            id: ""
         }
      });
   };

   onChange = event => {
      this.setState({
         formState: {
            ...this.state.formState,
            [event.target.name]: event.target.value
         }
      });
   };

   onSubmit = event => {
      const { tasks, formState } = this.state;
      event.preventDefault();
      const TaskName = event.target.querySelector("input[name='TaskName']").value;
      const Date = event.target.querySelector("input[name='Date']").value;
      const Priority = event.target.querySelector("select[name='Priority']").value;
      if (formState.mode === "submit") {
         this.setState({
            tasks: [
               ...this.state.tasks,
               {
                  TaskName,
                  Date,
                  Priority,
                  updating: false,
                  id: this.state.tasks[this.state.tasks.length - 1].id + 1
               }
            ]
         });
      } else if (formState.mode === "edit") {
         const index = tasks.find((task)=> task.id === formState.id).id;
         tasks[index] = {
                  TaskName,
                  Date,
                  Priority,
                  updating: false,
                  id: tasks[index].id
               }
         this.setState({
            tasks: [...tasks]
         });
      }

      this.resetFormState();
   };

   updateTask = key => {
      let { tasks } = this.state;
      tasks[key].updating = true;

      this.setState({ open: true });

      this.setState({
         formState: { ...this.state.tasks[key], mode: "edit" },
         tasks
      });
     }


   deleteTask = key => {
      let { tasks } = this.state;
      tasks.splice(key, 1);
      this.setState({
         tasks: [...tasks]
      });
   };

   render() {
      const { tasks, formState } = this.state;
      return (
         <div>
            <Form
               formState={formState}
               onChange={this.onChange}
               onSubmit={this.onSubmit}
            />
            <Table
               tasks={tasks}
               updateTask={this.updateTask}
               deleteTask={this.deleteTask}
            />
         </div>
      );
   }
}

const Table = ({ tasks = [], updateTask, deleteTask }) => {
   return (
      <div className="table">
         <div className="table-header">
            <div className="row">
               <div className="column">Task name</div>
               <div className="column">Date</div>
               <div className="column">Priority</div>
               <div className="column">Options</div>
            </div>
         </div>
         <div className="table-body">
            {tasks.map((task, key) => {
               return (
                  <div className={`row ${task.updating ? "updating" : ""}`}>
                     <div className="column">{task.TaskName}</div>
                     <div className="column">{task.Date}</div>
                     <div className="column">{task.Priority}</div>
                     <div className="column">
                        <button
                           className="update"
                           onClick={() => updateTask(key)}>
                           <p>Edit</p>
                        </button>
                        <button className="update">
                           <p onClick={() => deleteTask(key)}>Delete</p>
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

const Field = ({ label = "", name = "", value = "", onChange }) => {
   return (
      <div className="field">
         <input type="text"  placeholder={label} name={name} value={value} onChange={onChange} required/>
      </div>
   );
};

const Select = ({ label = "", name = "", value = "", onChange }) => {
   return (
      <div className="field">
         <select name={name} onChange={onChange}>
         <option value="null">priority</option>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
         </select>
      </div>
   );
};

const Form = ({ formState, onChange, onSubmit }) => {
   return (
      <form className="form" onSubmit={onSubmit}>
         <fieldset>
            <Field
               name="TaskName"
               label="Task name"
               value={formState.TaskName}
               onChange={onChange}
            />
            <Field
               name="Date"
               label="Date"
               value={formState.Date}
               onChange={onChange}
            />
            <Select
               name="Priority"
               label="Priority"
               value={formState.email}
               onChange={onChange}
            />
         </fieldset>
         <button class="button">{formState.mode}</button>
      </form>
   );
};


ReactDOM.render(<App />, document.getElementById("container"));

export default App;

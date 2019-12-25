// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { DatePicker, TextInput, Checkbox } from 'react-materialize';
import { updateEditItem } from '../../store/database/asynchHandler';


class ItemScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tItemScreen constructor");
        console.log(this.props.todoList)
        if(this.props.todoList)
        this.state = {
         
            description: this.props.todoList.items[this.props.match.params.key].description,
            assigned_to: this.props.todoList.items[this.props.match.params.key].assigned_to,
            due_date: this.props.todoList.items[this.props.match.params.key].due_date,
            completed: this.props.todoList.items[this.props.match.params.key].completed
        }
    }

    handleDescriptionChange = (event) => {
        console.log(this.props.todoList.items[this.props.match.params.key].description)
        this.setState({description: event.target.value});
    }

    handleAssignedToChange = (event) => {
        this.setState({assigned_to: event.target.value});
    }

    handleDueDateChange = (event) => {      
        console.log(event)  
        let month = event.getMonth() + 1
        let date = event.getDate()

        if (month < 10) {
            month = '0' + month;
        }

        let year = event.getFullYear()

        let stringDate = year + "-" + month + "-" + date;

        this.setState({due_date: stringDate});
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

    handleSubmit = () => {
        
        const editItem = {
            key: this.props.match.params.key,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed
        }
        console.log(editItem);
        console.log(this.props.todoList.items[this.props.match.params.key].description)
        console.log(this.state)
        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };

       
        this.props.todoList.items[this.props.match.params.key] = editItem
        console.log(this.props.todoList.items)
        props.registerEditItem(this.props.todoList, firebase)
        this.props.history.goBack();

        // this.props.buildAddNewItemTransaction(newItem);
    }

    handleCancel = () => {
       
        return this.props.history.goBack();
    }

    render() {
        const todoList = this.props.todoList;

        if(!todoList) {
            return <React.Fragment />
        }

        if(!this.props.match.params) {
            return <React.Fragment />
        }


        // DISPLAY WHERE WE ARE
        // const props = this.props;
        console.log("\t\tItemScreen render");
        
        return (
            <div id="todo_item"  className="todo_item container white" >
                
                <h4 id="item_heading" class = "center  grey darken-3 z-depth-2 white-text">Edit Item</h4>
                <div id="item_form_container" >
                <br></br>

                    <div  className = "input-field"> 
                        <input type="text" id="description" onChange={this.handleDescriptionChange} defaultValue = {this.props.todoList.items[this.props.match.params.key].description}/>
                        <label class="active" for="description">Description</label> 
                    </div>

                    <div  className = "input-field"> 
                        <input type="text" id="assign" onChange={this.handleAssignedToChange} defaultValue = {this.props.todoList.items[this.props.match.params.key].assigned_to}/>
                        <label class="active" for="assign">Assigned To</label> 
                    </div>

                    <DatePicker label = "Due Date" class = "active" onChange={this.handleDueDateChange} value = {this.props.todoList.items[this.props.match.params.key].due_date}/>

                    <label>
                        <input type="checkbox" onChange={this.handleCompletedChange} defaultChecked = {this.props.todoList.items[this.props.match.params.key].completed}/>
                        <span>Completed</span>
                        <br></br>

                    </label>
                    <br></br>

                </div>
                <button class="yes_button btn waves-effect waves-light pink" onClick={this.handleSubmit}>Submit
                                <i class="material-icons right">send</i>
                            </button>

                            <button class="no_button btn waves-effect waves-light pink modal-close" onClick={this.handleCancel}>Cancel
                                <i class="material-icons right">cloud</i>
                            </button>
                    {/* <button class="waves-effect waves-green btn-flat modal-close " onClick={this.handleSubmit}>Submit</button>
                    <button class="waves-effect waves-green btn-flat modal-close" onClick={this.handleCancel}>Cancel</button> */}

            </div>
            
        )
    }
}

// const mapStateToProps = (state, ownProps) => {

//     return {
//         todoLists: state.firestore.ordered.todoLists, 
//         auth: state.firebase.auth
//     };
// };

const mapStateToProps = (state, ownProps) => {
    const id= ownProps.match.params.id;
    // const key= ownProps.match.params.key;

    const todoLists  = state.firestore.data.todoLists;
    const todoList = todoLists ? todoLists[id] : null;
    if (todoList) {
        todoList.id = id;
    }
  
    return {
      todoList, todoLists,
      auth: state.firebase.auth,
    };
  };

  const mapDispatchToProps = dispatch => ({
    registerEditItem: (todoList, firebase) => dispatch(updateEditItem(todoList, firebase)),
    

  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemScreen);
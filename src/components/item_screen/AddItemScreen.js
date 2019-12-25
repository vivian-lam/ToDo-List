// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { DatePicker, TextInput, Checkbox } from 'react-materialize';
import { updateNewItem } from '../../store/database/asynchHandler';


class AddItemScreen extends Component {
    constructor(props) {
        super(props);

        // DISPLAY WHERE WE ARE
        console.log("\tItemScreen constructor");

        this.state = {
            description: "",
            assigned_to: "",
            due_date: "",
            completed: ""
        }
    }

    handleDescriptionChange = (event) => {
        this.setState({description: event.target.value});
    }

    handleAssignedToChange = (event) => {
        this.setState({assigned_to: event.target.value});
    }

    handleDueDateChange = (event) => {
        let month = event.getMonth() + 1
        let date = event.getDate()
        let year = event.getFullYear()

        let stringDate = year + "-" + month + "-" + date;

        this.setState({due_date: stringDate});
    }

    handleCompletedChange = (event) => {
        this.setState({completed: event.target.checked});
    }

    handleSubmit = () => {
        const newItem = {
            key: this.props.todoList.items.length,
            description: this.state.description,
            assigned_to: this.state.assigned_to,
            due_date: this.state.due_date,
            completed: this.state.completed
        }
        console.log(newItem);
        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };
        props.registerNewItem(this.props.todoList, firebase, newItem)
        this.props.history.goBack();

        // this.props.buildAddNewItemTransaction(newItem);
    }

    handleCancel = () => {
        return this.props.history.goBack();
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\tItemScreen render");

        return (
            <div id="todo_item"  className="todo_item container white">
            
            <h4 id="item_heading" class = "center  grey darken-3 z-depth-2 white-text">Add Item</h4>

                <div id="item_form_container">
                    <TextInput label="Description" onChange={this.handleDescriptionChange} />
                    <TextInput label="Assigned To" onChange={this.handleAssignedToChange}/>
                    <DatePicker label ="Due Date"  onChange={this.handleDueDateChange}/>
                    <Checkbox value="Red" label="Completed" onChange={this.handleCompletedChange}/>
                </div>

                    {/* <button class="waves-effect waves-green btn-flat modal-close " onClick={this.handleSubmit}>Submit</button>
                    <button class="waves-effect waves-green btn-flat modal-close" onClick={this.handleCancel}>Cancel</button> */}
                       <button class="yes btn waves-effect waves-light pink" onClick={this.handleSubmit}>Submit
                                <i class="material-icons right">send</i>
                            </button>

                            <button class="no btn waves-effect waves-light pink modal-close" onClick={this.handleCancel}>Cancel
                                <i class="material-icons right">cloud</i>
                            </button>

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
    registerNewItem: (todoList, firebase, newName) => dispatch(updateNewItem(todoList, firebase, newName)),
    

  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(AddItemScreen);
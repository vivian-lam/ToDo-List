import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { updateHandlerName } from '../../store/database/asynchHandler';
import { updateHandlerOwner } from '../../store/database/asynchHandler';
import { updateSorting } from '../../store/database/asynchHandler';
import { updateDelete } from '../../store/database/asynchHandler';

import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChangeName = (e) => {
        e.preventDefault();
        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        let newName = e.target.value;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };
        props.registerName(this.props.todoList, firebase, newName);

    }

    handleChangeOwner = (e) => {
        e.preventDefault();

        const { target } = e;
        
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        let newOwner = e.target.value;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };
        props.registerOwner(this.props.todoList, firebase, newOwner);

    }
    showDialog = () => {
        var object = this.refs.modal_yes_no_dialog;  
        object.classList.add("is_visible");
    }

    hideDialog = () => {
    var object = this.refs.modal_yes_no_dialog;  
    object.classList.toggle("is_visible");
    }

    removeList = (listToRemove) => {
        console.log(listToRemove)
        console.log(this.props.todoLists)
        const { props, state } = this;
        const { firebase } = props;
        props.registerDelete(this.props.todoLists, firebase, listToRemove);

        this.props.history.push('/:any');
        
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList) {
            return <React.Fragment />
        }


        return (
            
            <div className="todo_item container white">

                <div className = "todoListHeader">
                    <h4 className="grey-text text-darken-3">Todo List</h4>
                </div>
                <div className = 'trashCan'>
                    <div>
                    <Button floating large href="#modal1" className="modal-trigger"  >
                    <i class="material-icons left purple lighten-2" >delete</i> 

                    </Button >
                        <Modal id="modal1" header="Delete list?" actions = {<p modal = "close"> </p>}>
                                
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                            <button class="yes_button btn waves-effect waves-light blue lighten-2" onClick = {() => this.removeList(this.props.todoList)}>Yes
                                <i class="material-icons right">send</i>
                            </button>

                            <button class="no_button btn waves-effect waves-light blue lighten-2 modal-close">No
                                <i class="material-icons right">cloud</i>
                            </button>
                            {/* <button class="waves-effect waves-green btn-flat modal-close " onClick = {() => this.removeList(this.props.todoList)}>Yes</button>
                            <button class="waves-effect waves-green btn-flat modal-close">No</button> */}
                          
                            <footer className="dialog_footer">
                                The list will not be retreivable.
                            </footer> 
                        </Modal>
                </div>           
                </div>
                <div className="input-field">
                    <input input type="text" name="name" id="name" onChange={this.handleChangeName} defaultValue={todoList.name}/>
                    <label class="active" htmlFor="email">Name</label>
                   
                </div>
                <div className="input-field">
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChangeOwner} defaultValue={todoList.owner} />
                    <label class = "active" htmlFor="password">Owner</label>
                </div>
                <ItemsList todoList={todoList} todoLists = {this.props.todoLists} history = {this.props.history} />

            </div>
        );
    }
}

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
    registerName: (todoList, firebase, newName) => dispatch(updateHandlerName(todoList, firebase, newName)),
    registerOwner: (todoList, firebase, newOwner) => dispatch(updateHandlerOwner(todoList, firebase, newOwner)),
    registerDelete: (todoList, firebase, listToRemove) => dispatch(updateDelete(todoList, firebase, listToRemove)),

  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);
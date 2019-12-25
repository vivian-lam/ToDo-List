import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase';
import { updateSorting } from '../../store/database/asynchHandler'
import { Container, Button, lightColors, darkColors } from '../../../node_modules/react-floating-action-button'
// import { Container, Button} from '../../../node_modules/react-floating-action-button'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

class ItemsList extends React.Component {
    sortingTask = (e, list) => {
        let sortedBoolean = true;

        for (let i = 0; i < list.length-1; i++) {
            for (let j = 0; j < list.length -i-1; j++) {
                if (list[j].description.toLowerCase() > list[j+1].description.toLowerCase()) {
                    sortedBoolean = false;
                    let temp = list[j];

                    let key = list[j].key;
                    let tempKey = list[j+1].key;

                    list[j].key = tempKey;
                    list[j+1].key = key;

                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }

        if (sortedBoolean == true) {
            for (let i = 0; i < list.length-1; i++) {
                for (let j = 0; j < list.length -i-1; j++) {
                    if (list[j].description.toLowerCase() < list[j+1].description.toLowerCase()) {
                        sortedBoolean = false;
                        let temp = list[j];
    
                        let key = list[j].key;
                        let tempKey = list[j+1].key;
    
                        list[j].key = tempKey;
                        list[j+1].key = key;
    
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
        }
        e.stopPropagation();

        this.props.todoList.items = list;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };

        console.log(this.props.todoList.items)
        console.log(list)
        props.registerSorting(this.props.todoList, firebase, list);

        // this.forceUpdate();
    }

    sortingDate = (e, list) => {
        let sortedBoolean = true;

        for (let i = 0; i < list.length-1; i++) {
            for (let j = 0; j < list.length -i-1; j++) {
                if (list[j].due_date > list[j+1].due_date) {
                    sortedBoolean = false;
                    let temp = list[j];

                    let key = list[j].key;
                    let tempKey = list[j+1].key;

                    list[j].key = tempKey;
                    list[j+1].key = key;

                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }

        if (sortedBoolean == true) {
            for (let i = 0; i < list.length-1; i++) {
                for (let j = 0; j < list.length -i-1; j++) {
                    if (list[j].due_date < list[j+1].due_date) {
                        sortedBoolean = false;
                        let temp = list[j];
    
                        let key = list[j].key;
                        let tempKey = list[j+1].key;
    
                        list[j].key = tempKey;
                        list[j+1].key = key;
    
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
        }
        e.stopPropagation();

        this.props.todoList.items = list;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };

        console.log(this.props.todoList.items)
        console.log(list)
        props.registerSorting(this.props.todoList, firebase, list);
        // this.forceUpdate();
        // LOAD LIST
    }

    sortingStatus = (e, list) => {
        let sortedBoolean = true;

        for (let i = 0; i < list.length-1; i++) {
            for (let j = 0; j < list.length -i-1; j++) {
                if (list[j].completed > list[j+1].completed) {
                    sortedBoolean = false;
                    let temp = list[j];

                    let key = list[j].key;
                    let tempKey = list[j+1].key;

                    list[j].key = tempKey;
                    list[j+1].key = key;

                    list[j] = list[j+1];
                    list[j+1] = temp;
                }
            }
        }

        if (sortedBoolean == true) {
            for (let i = 0; i < list.length-1; i++) {
                for (let j = 0; j < list.length -i-1; j++) {
                    if (list[j].completed < list[j+1].completed) {
                        sortedBoolean = false;
                        let temp = list[j];
    
                        let key = list[j].key;
                        let tempKey = list[j+1].key;
    
                        list[j].key = tempKey;
                        list[j+1].key = key;
    
                        list[j] = list[j+1];
                        list[j+1] = temp;
                    }
                }
            }
        }
        e.stopPropagation();
        this.props.todoList.items = list;

        const { props, state } = this;
        const { firebase } = props;
        const todoList = { ...state };

        console.log(this.props.todoList.items)
        console.log(list)
        props.registerSorting(this.props.todoList, firebase, list);
        // this.forceUpdate();
        // LOAD LIST
    }

    addItem = () => {
        return (
            this.props.history.push('/todoList/'+ this.props.todoList.id+'/addItemScreen')
        );
    }

    
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const history = this.props.history;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">

                    
                    <div className = "listItems deep-orange lighten-4"> 
                    <div className = "badage header_container grey darken-3" >
                        <span className="list_item_task_header" onClick = {(e) => this.sortingTask(e, this.props.todoList.items)}>Task</span>
                        <span className="list_item_due_date_header"onClick = {(e) => this.sortingDate(e, this.props.todoList.items)}>Due Date </span>
                        <span className="list_item_status_header"onClick = {(e) => this.sortingStatus(e, this.props.todoList.items)}>Status</span>
                    </div>
                        {items && items.map(function(item) {
                        item.id = item.key;
                        return (
                            <div>
                            <ItemCard todoList={todoList} item={item}  history = {history} />
                            </div>

                            );})
                        }
                        <div className = "addButton center " onClick = {this.addItem}>
                            <a class="btn-floating btn-medium waves-effect waves-light pink accent-1 "><i class="material-icons">add</i> </a>            
                        </div>

                    </div>
                   
               
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;

    return {
        todoList,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = dispatch => ({
    registerSorting: (todoList, firebase,items ) => dispatch(updateSorting(todoList, firebase,items)),
  });

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);
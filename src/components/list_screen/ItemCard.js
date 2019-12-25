import React from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import { updateMoveUp } from '../../store/database/asynchHandler';
import { updateMoveDown } from '../../store/database/asynchHandler';
import { updateRemoveItem } from '../../store/database/asynchHandler';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ItemCard extends React.Component {
    moveUp = (e, listBeingEdited, listItemIndex) => {
        if (listItemIndex != 0) {
            let temp = listBeingEdited[listItemIndex];
            let before = listBeingEdited[listItemIndex-1]

            let key = listBeingEdited[listItemIndex].key;
            let tempKey = listBeingEdited[listItemIndex-1].key;

            listBeingEdited[listItemIndex].key = tempKey;
            listBeingEdited[listItemIndex-1].key = key;

            listBeingEdited[listItemIndex] = before;
            listBeingEdited[listItemIndex-1] = temp;
    
            const { props } = this;
            const { firebase } = props;
            props.registerMoveUp(this.props.todoList, firebase);

        }
        e.stopPropagation();

    }

    moveDown = (e, listBeingEdited, listItemIndex) => {
       
        if (listItemIndex != listBeingEdited.length-1) {
            let temp = listBeingEdited[listItemIndex];
            let before = listBeingEdited[listItemIndex+1]

            let key = listBeingEdited[listItemIndex].key;
            let tempKey = listBeingEdited[listItemIndex+1].key;

            listBeingEdited[listItemIndex].key = tempKey;
            listBeingEdited[listItemIndex+1].key = key;

            listBeingEdited[listItemIndex] = before;
            listBeingEdited[listItemIndex+1] = temp;

            const { props } = this;
            const { firebase } = props;
            props.registerMoveDown(this.props.todoList, firebase);

        }

        e.stopPropagation();
    }

    itemRemove = (e, currentList, key) => {
        if (key >= 0) {
            currentList.splice(key,1);
        }
        e.stopPropagation();

        for (var i = key; i < currentList.length; i++) {
            currentList[i].key = currentList[i].key-1;
        }

        e.stopPropagation();

        const { props } = this;
        const { firebase } = props;
        props.registerRemoveItem(this.props.todoList, firebase);    }
    
    editItem = (e) => {

        return (
           // <ItemScreen item = {this.props.item.id}></ItemScreen>
            this.props.history.push('/todoList/'+ this.props.todoList.id+ '/' + this.props.item.id + '/itemScreen')
            
        );
    }

    disable = (e) => {
        console.log("adsfad")
        e.stopPropagation();
    }

    render() {
        
        const { item } = this.props;  
        return (
            <div className="card z-depth-1 todo-list-link white waves-effect waves-red lighten-3" onClick = {(e) => this.editItem(e)}>
                <div className="card-content grey-text text-darken-3 ">
                
                    <span className="description">{item.description} </span>
                    <span className = "due_date"> {item.due_date}</span>
                    {item.completed ? <span className='completed'> {item.completed == true &&<font color = "green">Completed</font>} </span>
                        : <span className='not_completed' > {item.completed == false &&<font color = "red">Pending</font>} </span>}

                    <div className="assigned">Assigned to: {item.assigned_to}</div>


                    <div className = "FAB" onClick = {(e) => this.disable(e)}> 
                        <Fab         
                            // event="hover"
                            position={{right: 50}}
                            mainButtonStyles={{backgroundColor: '#64b5f6', marginRight: '-350px'}}
                            icon='🖊️'
                        >
                            <div className = "floating">
                                <div className = "moveUp">
                                    {item.key == 0 ? 
                                    
                                    <a class="btn-floating disabled waves-effect" > <i class="material-icons" 
                                    onClick = {(e) => this.disable(e)}
                                    >arrow_upward</i></a>:

                                    <a class="btn-floating teal lighten-2 waves-effect"  > <i class="material-icons" 
                                        onClick = {(e) => this.moveUp(e, this.props.todoList.items, this.props.todoList.items.indexOf(this.props.item))} 
                                        >arrow_upward</i></a>}
                                </div>

                                <div className = "moveDown">
                                    {item.key == this.props.todoList.items.length - 1 ? 
                                    
                                    <a class="btn-floating disabled waves-effect" > <i class="material-icons" onClick = {this.disable} >arrow_downward</i></a>:

                                    <a class="btn-floating deep-orange accent-2 waves-effect" > <i class="material-icons" 
                                    onClick = {(e) => this.moveDown(e, this.props.todoList.items, this.props.todoList.items.indexOf(this.props.item))}
                                    >arrow_downward</i></a>}
                                </div> 

                                <div className = "closeBtn">
                                    <a class="btn-floating  amber lighten-1 waves-effect"><i class="material-icons"
                                        onClick = {(e) => this.itemRemove(e, this.props.todoList.items, this.props.todoList.items.indexOf(this.props.item))}
                                        >close</i></a>
                                </div>


                               
                        
                                
                            </div>
                               
                        </Fab>
                    </div>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    registerMoveUp: (todoList, firebase) => dispatch(updateMoveUp(todoList, firebase)),
    registerMoveDown: (todoList, firebase) => dispatch(updateMoveDown(todoList, firebase)),
    registerRemoveItem: (todoList, firebase) => dispatch(updateRemoveItem(todoList, firebase)),
  });

  export default compose(connect(null, mapDispatchToProps))(ItemCard);